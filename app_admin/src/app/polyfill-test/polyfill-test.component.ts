import { Component, OnInit } from "@angular/core";
import { Buffer } from 'buffer/';

@Component({
  selector: 'app-polyfill-test',
  template: '<p>Polyfill Test Component</p>',
  styleUrls: ['./polyfill-test.component.css'],
})
export class PolyfillTestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const buffer = Buffer.from('test');
    console.log('Buffer:', buffer);
  }
}
