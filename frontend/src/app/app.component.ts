import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestService } from './services/test.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  testData?: {title: string} ;

  constructor(private testService: TestService){}

  ngOnInit() {
      this.testService.getTestData().subscribe(data => {
        this.testData = data;
      })
  }
}
