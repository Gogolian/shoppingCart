import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HeaderComponent } from './header.component'
import { StoreModule } from '@ngrx/store';
import { appReducer } from 'src/app/app.reducer'
import { By } from 'protractor'

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
  
  describe(`When NOT Authenticated`, () => {

    beforeEach(() => {
      fixture.componentInstance.isAuthenticated = false
      fixture.detectChanges()
    })
    
    it(`should display 'Authenticate' menu item`,() => {
      expect(compiled.querySelector('.nav.navbar-nav').innerHTML).toContain(`Authenticate`)
    })

    it(`should not display top menu Recipes or Shopping List`,() => {
      expect(compiled.querySelector('.nav.navbar-nav').innerHTML).not.toContain(`Recipes`)
      expect(compiled.querySelector('.nav.navbar-nav').innerHTML).not.toContain(`Shopping List`)
    })
      
    it(`should display top-right corner menu`,() => {
      expect(compiled.querySelector('.navbar-right').children.length).toBe(0)
    })
    
    it(`should not display Logout and Manage menu`,() => {
      expect(compiled.querySelector('#logout-button')).toBeNull()
      expect(compiled.querySelector('#manage-menu')).toBeNull()
    })
    
  })
  
  describe(`When Authenticated`, () => {
    
    beforeEach(() => {
      fixture.componentInstance.isAuthenticated = true
      fixture.detectChanges()
    })
    
    it(`should not display 'Authenticate' menu item`,() => {
      expect(compiled.querySelector('.nav.navbar-nav').innerHTML).not.toContain(`Authenticate`)
    })
    
    it(`should not display top menu Recipes or Shopping List`,() => {
      expect(compiled.querySelector('.nav.navbar-nav').innerHTML).toContain(`Recipes`)
      expect(compiled.querySelector('.nav.navbar-nav').innerHTML).toContain(`Shopping List`)
    })

    it(`should not display top-right corner menu`,() => {
      expect(compiled.querySelector('.navbar-right').children.length).not.toBe(0)
    })
    
    it(`should not display Logout and Manage menu`,() => {
      expect(compiled.querySelector('#logout-button').innerHTML).toContain(`Logout`)
      expect(compiled.querySelector('#manage-menu').innerHTML).toContain(`Manage`)
    })
    
  })

  //TODO: expect ng init


})
