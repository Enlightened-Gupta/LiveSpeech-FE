export interface RegisterUserRequest
{
    Email:string;
    FirstName :string;
    LastName:string;    
    PasswordHash :string;
    PhoneNumber:string;
    Role:string;
    //StripeId:string;
    AddressLine1:string;
    // AddressLine2:string;
    City:string;
    State:string;
    PostalCode:string;
    Country:string;
    IsAgreed:boolean;
}