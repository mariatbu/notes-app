import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() body: string | undefined;
  @Input() link: string | undefined;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator', {static: true}) truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText', {static:true}) bodyText!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

    if(this.bodyText.nativeElement.scrollHeight > viewableHeight){
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    }else{
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

  onXButtonClick(){
    this.deleteEvent.emit();
  }

}
