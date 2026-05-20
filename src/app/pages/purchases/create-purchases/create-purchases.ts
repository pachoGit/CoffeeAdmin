import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PurchaseFormManager } from '../common/purchase-form';
import { PurchaseService } from '../../../services/purchases/purchase-service';
import { CoffeeProducerService } from '../../../services/coffee-producer/coffee-producer.service';
import { CoffeeTypeService } from '../../../services/coffee-type/coffee-type-service';
import { CoffeeVarietyService } from '../../../services/coffee-variety/coffee-variety-service';
import { MeasurementUnitCoffeeService } from '../../../services/measurement-unit-coffee/measurement-unit-coffee-service';
import { DataSelectCoffeeProducerResponse } from '../../../services/coffee-producer/response/select-coffee-producer.response';
import { DataSelectCoffeeTypeResponse } from '../../../services/coffee-type/response/select-coffee-type.response';
import { DataSelectCoffeeVarietyResponse } from '../../../services/coffee-variety/response/select-coffee-variety.response';
import { DataSelectMeasurementUnitCoffeeResponse } from '../../../services/measurement-unit-coffee/response/select-measurement-unit-coffee.response';

@Component({
  selector: 'coffee-create-purchases',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-purchases.html',
  styleUrl: './create-purchases.css',
})
export class CreatePurchases implements OnInit, OnDestroy {
  private purchaseService = inject(PurchaseService);
  private coffeeProducerService = inject(CoffeeProducerService);
  private coffeeTypeService = inject(CoffeeTypeService);
  private coffeeVarietyService = inject(CoffeeVarietyService);
  private measurementUnitCoffeeService = inject(MeasurementUnitCoffeeService);

  private purchaseFormManager = new PurchaseFormManager();
  public purchaseForm = this.purchaseFormManager.getForm();
  private priceSubscription?: Subscription;

  public coffeeProducers = signal<DataSelectCoffeeProducerResponse[]>([]);
  public coffeeTypes = signal<DataSelectCoffeeTypeResponse[]>([]);
  public coffeeVarieties = signal<DataSelectCoffeeVarietyResponse[]>([]);
  public measurementUnits = signal<DataSelectMeasurementUnitCoffeeResponse[]>([]);

  public detailPrices = signal<number[]>([]);

  public formattedTotalCost = computed(() =>
    this.purchaseFormManager.formatPrice(
      this.detailPrices().reduce((sum, price) => sum + price, 0),
    ),
  );

  ngOnInit(): void {
    this.loadSelects();
    this.setupPriceTracking();
  }

  ngOnDestroy(): void {
    this.priceSubscription?.unsubscribe();
    this.purchaseFormManager.destroy();
  }

  private setupPriceTracking(): void {
    this.priceSubscription = this.purchaseForm.valueChanges.subscribe(() => {
      const prices = this.detailPurchases.controls.map((_, i) =>
        this.purchaseFormManager.getDetailPrice(i),
      );
      this.detailPrices.set(prices);
    });
  }

  private loadSelects(): void {
    this.coffeeProducerService.select().subscribe({
      next: (response) => {
        this.coffeeProducers.set(response.data.result);
      },
    });

    this.coffeeTypeService.select().subscribe({
      next: (response) => {
        this.coffeeTypes.set(response.data.result);
      },
    });

    this.coffeeVarietyService.select().subscribe({
      next: (response) => {
        this.coffeeVarieties.set(response.data.result);
      },
    });

    this.measurementUnitCoffeeService.select().subscribe({
      next: (response) => {
        this.measurementUnits.set(response.data.result);
      },
    });
  }

  get detailPurchases(): FormArray {
    return this.purchaseFormManager.getDetailPurchasesArray();
  }

  addDetailPurchase(): void {
    this.purchaseFormManager.addDetailPurchase();
  }

  removeDetailPurchase(index: number): void {
    this.purchaseFormManager.removeDetailPurchase(index);
  }

  formatPrice(value: number): string {
    return this.purchaseFormManager.formatPrice(value);
  }

  onSubmit(): void {
    if (this.purchaseForm.invalid) {
      this.purchaseForm.markAllAsTouched();
      return;
    }

    const request = this.purchaseFormManager.transformToRequest();
    this.purchaseService.create(request).subscribe({
      next: (response) => {
        console.log('Purchase created successfully', response);
      },
      error: (error) => {
        console.error('Error creating purchase', error);
      },
    });
  }
}