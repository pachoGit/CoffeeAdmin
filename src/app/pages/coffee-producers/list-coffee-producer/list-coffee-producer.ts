import { Component, inject, OnInit, signal } from '@angular/core';
import { CoffeeProducerService } from '../../../services/coffee-producer/coffee-producer.service';
import {
  DataListCoffeeProducerResponse,
  ListCoffeeProducerResponse,
} from '../../../services/coffee-producer/response/list-coffee-producer.response';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'coffee-list-coffee-producer',
  imports: [DatePipe],
  templateUrl: './list-coffee-producer.html',
  styleUrl: './list-coffee-producer.css',
})
export class ListCoffeeProducer implements OnInit {
  protected producers = signal<DataListCoffeeProducerResponse[]>([]);

  private coffeeProducerService = inject(CoffeeProducerService);

  ngOnInit(): void {
    this.coffeeProducerService.list().subscribe((response) => {
      let data = response.data as ListCoffeeProducerResponse;
      this.producers.set(data.result);
    });
  }
}
