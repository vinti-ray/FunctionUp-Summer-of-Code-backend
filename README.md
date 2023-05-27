
## Super Market Billing Project
----------- Requirement 


1). Create a Registration page
Input Field required

a).Organisations Name

b).Email

c)Password

d)confirm Password

e)Country

f).State

g)City

h)Pincode
    Functionality Required 
a)Email should be unique 
b).After registration store it into collection ( Create a collection for storing biils)
c.)Password  should be in encrypted


2). Create a Login Page
Input Field required
a).Email
b).Password
    Functionality Required 
a).Remember me Check Box
b).After login Token should be generated and Stored in localStorage

3). Create a page for Billing
    Input Fields required 
    a). Customer Name 
    b). Customer Number 
     
   c). payment Option ( Cash / card / Online )
    d).    Item                     Quantity           MRP              Discounted Price             Value 
    Ex.    Bread                       2                40                     37.5                  75.00
    e). CGST ( it will show only not editable )
    f). SGST ( It will show only not editable )
    g).Email
    h). Submit button 
    Functionality Required 
    b).User Must be loggined
    a). Value should automatic fatch ( Quantity * discounted price )
    b). Click on submit - It should generate invoice with customer name, number, total value ( excluding cgst / sgst ), 
        cgst, sgst, payable amount ( including cgst / sgst ), payment method 
    c). After generating bill store it into collection ( Create a collection for storing biils)
    d).After successful submition  a mail should be sent to user's email


4). Create a page where you can show all bills 
    In the page what you have to show - 
    a). Bill no
    b). Customer Name 
    c). Customer Number 
    d). Bill amount 
    e). Paid amount
    f). Generated date
   g).invoice Id
    For creating this page you need to use datatable
    For using datatable first create API which return all bill details which belongs to this organization 

5). Create a page Where you can manage Inventory ( Create collection named Inventory and store all inventory details )
    Input Field requirments 
    a). Brand Name  brandName,itemName,itemQuantity
    b). Item Name 
    c). item Quantity 
    d). Submit 
    Functionality Requirment
    a). click on submit - save it into inventory collection

6). Create a page where you can manage Staff ( Create collection named employee and store all staff details )
    Input Field requirment 
    a). Staff Name
    b). Number 
    c). Email
    d). Date of joining 
    e). Date of Joining 
    f). Salary
    g). Image
    h). Department ( Where employee is working )
    i). submit
    Functionality Requirment 
    a). Click on submit - save into employees collections 

7). Create a page where you have to show total sale ( day wise )
    In the page what you have to show - 
    a). Total Bill ( total sale day wise)
    b). Total Amount
    c). Paidn Amount
    f).  Date
    For creating this page you need to use datatable
    For using datatable first create API which return all bill details which belongs to this organization

7)Create a sidebar to put the link of other's page

8).Create a nav bar and there create a dropdown
functionality required-
a). Add profile and logout option there
 b).  on click of profile a new page should open where there will be profile details of organisation including organisation logo and  on that page there should be option to update the data as well
c). There will be a button to update password  and on click of that button it should redirect to update password page 
d). In update password page 
    *Password
    *Old Password
    *Confirm Password
    *forgot Password

9). Create a functionality of forgot password 
    In the page what you have to show - 
    a). Email
    b). Generate OTP button 

   Functionality required 
    a). Once you click on generate otp button - create an otp and send it in email and redirect the page where there will be option of enter otp once you enter otp and is valid then after  click on submit it should navigate to update password page

  a). Password 
  b). Confirm Password 
  c). Submit button
       



10).Integrate Payment Gateway using google pay -
    In the billing page - 
a).Show a google pay  button 
b).On clink of that button google payment page should open 
