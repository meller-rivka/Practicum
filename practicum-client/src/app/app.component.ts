import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { HomeComponent } from './components/home/home.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnChanges, AfterViewInit  {
  title = 'Mng';
  // הפוקנציה הראשונה שעולה מיד בהעלת הקומפוננטה לאויר
  ngOnInit(): void {
  }

// אחרי שהשתנה אלמנטים (לךדוגמא ששלחנו אינפוט לקומפוננטת ילד והיא השתנתה שם)
  ngOnChanges(changes: SimpleChanges): void {

  }

  // אחרי שכל הדום עלה כבר
  ngAfterViewInit(): void {
  }
}
