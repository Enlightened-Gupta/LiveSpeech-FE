import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

// import { AuthInterceptor } from './auth.interceptor';
// describe('AuthInterceptor', () => {
//   let service: AuthInterceptor;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(AuthInterceptor);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
