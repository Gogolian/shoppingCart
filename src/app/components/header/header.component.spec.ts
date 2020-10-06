import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HeaderComponent } from './header.component'
import { StoreModule } from '@ngrx/store';
import { appReducer } from 'src/app/app.reducer'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>
  let compiled

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(appReducer)
      ],
      declarations: [HeaderComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    compiled = fixture.nativeElement;
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it(`should display 'RecipeBook' title`,() => {
    expect(compiled.querySelector('.navbar-brand').textContent).toContain(`Recipe Book`)
  })

  it(`should display top menu with at least 1 item`,() => {
    expect(compiled.querySelector('.nav.navbar-nav').innerHTML).toContain(`<li>`)
  })
  
  describe(`When NOT Authenticated `, () => {
    
    it(`should display 'Authenticate' menu item`,() => {
      expect(compiled.querySelector('.nav.navbar-nav').innerHTML).toContain(`Authenticate`)
    })

    it(`should not display top menu Recipes or Shopping List`,() => {
      expect(compiled.querySelector('.nav.navbar-nav').innerHTML).not.toContain(`Recipes`)
      expect(compiled.querySelector('.nav.navbar-nav').innerHTML).not.toContain(`Shopping List`)
    })
    
  })


  it(`should display top-right corner menu if authenticated`,() => {

    expect(compiled.querySelector('.nav.navbar-nav').innerHTML).toContain(`<li>`)
  })


})
