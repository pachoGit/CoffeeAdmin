import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  selector: 'coffee-edit-purchases',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './edit-purchases.html',
  styleUrl: './edit-purchases.css',
})
export class EditPurchases implements OnInit, OnDestroy {
  private purchaseService = inject(PurchaseService);
  private coffeeProducerService = inject(CoffeeProducerService);
  private coffeeTypeService = inject(CoffeeTypeService);
  private coffeeVarietyService = inject(CoffeeVarietyService);
  private measurementUnitCoffeeService = inject(MeasurementUnitCoffeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

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

  private purchaseId!: number;

  ngOnInit(): void {
    this.purchaseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSelects();
    this.setupPriceTracking();
    this.loadPurchase();
  }

  ngOnDestroy(): void {
    this.priceSubscription?.unsubscribe();
    this.purchaseFormManager.destroy();
  }

  private loadPurchase(): void {
    this.purchaseService.getById(this.purchaseId).subscribe({
      next: (response) => {
        this.purchaseFormManager.populateForm(response.data);
        this.purchaseForm.get('coffeeProducerId')?.disable();
        this.updateDetailPrices();
      },
      error: () => {
        this.router.navigate(['/purchases']);
      },
    });
  }

  private setupPriceTracking(): void {
    this.priceSubscription = this.purchaseForm.valueChanges.subscribe(() => {
      this.updateDetailPrices();
    });
  }

  private updateDetailPrices(): void {
    const prices = this.detailPurchases.controls.map((_, i) =>
      this.purchaseFormManager.getDetailPrice(i),
    );
    this.detailPrices.set(prices);
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

    const request = this.purchaseFormManager.transformToUpdateRequest();
    this.purchaseService.update(this.purchaseId, request).subscribe({
      next: () => {
        this.router.navigate(['/purchases', this.purchaseId]);
      },
      error: (error) => {
        console.error('Error updating purchase', error);
      },
    });
  }
}
