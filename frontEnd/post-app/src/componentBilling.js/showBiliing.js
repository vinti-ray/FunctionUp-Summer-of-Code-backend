import React, { useEffect, useState } from "react";
import { Button, Form, Table, Card,InputGroup,ButtonGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./billing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./sideBar";
import ShopDetail from "./shopDetail";
import jwt_decode from 'jwt-decode';

// import Shop from "./shopDetail";

function Invoice() {
  const [customerName, setCustomerName] = useState("");
  const [nameError,setNameError]=useState("")
  const [customerNumber, setCustomerNumber] = useState("");
  const [items, setItems] = useState([
    { itemName: "", quantity: null, discountedPrice: null, mrp: null, value: null },
  ]);
  
  const [paymentMehtod, setPaymentMethod] = useState("");
  const [numberError,setNumberError]=useState("")
   const [paymentError, setPayementError] = useState("");
   const [itemNumberError,setitemNumberError]=useState("")
  const [total, setTotal] = useState(null);
  const [netTotal, setNetTotal] = useState(null);
  const[itemError,setItemError]=useState("")
  const [id,setId]=useState("")

  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    // e.target=<input type="text" class="form-control" value="7676667" name="discountedPrice">
    const list = [...items];
    list[index][name] = value; //index will give index of each item in item array  list[index][name]
    list[index].value =
     ( list[index].quantity *
      (list[index].mrp - (list[index].mrp *( list[index].discountedPrice / 100)))); //value=quantity*(price-(price*discountPrice/100)
    setItems(list);



  };
  useEffect(()=>{
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      total = total + items[i].value;
    }

  
    setTotal(total);
    let netTotal = total +( total * (28 / 100))
    setNetTotal(netTotal); //let amountToPay=total+(total*(GST/100))

  },[items])

  const validate=(e)=>{
    let check=""
    let error=""
    let itemError=""
    const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
    const numberRegex = /[0-9]/;
    if(!regex.test(customerNumber)){
     error="please enter valid mobile number "
    }
    setNumberError(error)
    if(!regex.test(items[0].mrp)){
      
    }
    if(paymentMehtod==""){
      check="please select payment option"
    }
    if(customerName==""){
      setNameError("please enter customer name")
    }
    setPayementError(check)


    const list = [...items];
    for(let i=0;i<list.length;i++){
      // if(!list[i].discountedPrice){
        //   setItemError("please enter diccoount if there is no discount please enter 0")
        // }
        
        
        if(!numberRegex.test(list[i].mrp)){
          setitemNumberError("mrp should be number")
        }
        if(!numberRegex.test(list[i].discountedPrice)){
          setitemNumberError("discounted should be number")
        }
        if(!numberRegex.test(list[i].quantity)){
          setitemNumberError("quantity should be number")
        }
        if(!list[i].mrp){
          setitemNumberError("please enter mrp")
        }
        if(!list[i].quantity){
          setitemNumberError("please enter quantity")
        }
    if(list[i].itemName==""){
      setitemNumberError("please enter item name")
    }
  }
    return !(error||check)
  }
  const handleAddItem = () => {
    setItems([
      ...items,
      { itemName: "", quantity: null, discountedPrice: null, mrp: null, value: null },
    ]);
  };

  const handleRemoveItem = (index) => {
    if(items.length>1){

 
    const list = [...items];
    

    list.splice(index, 1);
    setItems(list);
    }else{
    setItemError("Can't remove if there is just one input field")
    }
  };

  const generateInvoice = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid&&items) {

      window.print();
    }

    // console.log(items)
    // if((!items[0].itemName)||(!items[0].quantity)||(!items[0].mrp)||customerName==""||customerNumber==""||paymentMehtod==""){
    //   alert("please fill complete form and add atleast one item")
    // }else{
    //   window.print();
    // }

  };
  useEffect(()=>{
    let token=localStorage.getItem("token")
    const decodedToken = jwt_decode(token);
    setId(decodedToken.id)

  },[])

  // const navigate = useNavigate();
  useEffect(()=>{
    let token=localStorage.getItem("token")
    if(!token){
      navigate('/login')
    }
    return () => {};
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    let token=localStorage.getItem("token")
    const isValid = validate();
    if (isValid) {

    let data = {
      customerName: customerName,
      number: customerNumber,
      item: items,
      paymentMethod: paymentMehtod,
      total: total,     
      netTotal: netTotal,
      organisationId:id
    };
    axios.post("http://localhost:3001/createbill", data, { headers: { "token": token } }).then((e) => {
      navigate('/');
    });
  }};

  const paymentMethods = [
    { label: "Credit Card", value: "credit_card/debit_card" },
    { label: "Cash", value: "cash" },
    { label: "Upi", value: "upi" },
  ];

  return (
    <div>
    <div className='sidebar'>
    <Sidebar/>
  </div>

    <div className="main-content">
      <Card className="invoice-card">
        <h1 className="text-center">Invoice</h1>
        <ShopDetail/>
        {/* <Shop/> */}
        <Form onSubmit={handleSubmit}>
          {/* <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              className="input"
              type="date"
              style={{ width: "50%" }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required={true}
            />
          </Form.Group> */}

          <Form.Group controlId="customerName">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              className="input"
              type="text"
              style={{ width: "50%" }}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
             <div style={{ color: 'red'}} className="error">{nameError}</div>
          </Form.Group>

          <Form.Group controlId="customerNumber">
            <Form.Label>Customer Number</Form.Label>
            <Form.Control
              className="input"
              maxLength={10}
              type="text"
              value={customerNumber}
              style={{ width: "50%" }}
              onChange={(e) => setCustomerNumber(e.target.value)}
              required
            />
          <div style={{ color: 'red'}} className="error">{numberError}</div>

          </Form.Group>

          <Table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Discount (%)</th>
                <th>MRP</th>
                <th>Value</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      className="input"
                      type="text"
                      name="itemName"
                      value={item.itemName}
                      onChange={(e) => handleInputChange(e, index)}
                      required={true}
                    />
                  </td>

                  <td>
                    <Form.Control
                      className="input"
                      type="text"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleInputChange(e, index)}
                      required={true}
                    />
                  </td>

                  <td>
                    <Form.Control
                      className="input"
                      type="text"
                      name="discountedPrice"
                      value={item.discountedPrice}
                      onChange={(e) => handleInputChange(e, index)}
                      required={true}
                    />
                  </td>

                  <td>
                    <Form.Control
                      className="input"
                      type="text"
                      name="mrp"
                      value={item.mrp}
                      onChange={(e) => handleInputChange(e, index)}
                      required={true}
                    />
                  </td>

                  <td>{item.value}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="no-print"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />{" "}
                    </Button>
                  </td>
                  <Button
                    variant="warning"
                    className="no-print"
                    onClick={() => handleAddItem(index)}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  
                </tr>
                
              ))}
               <div style={{ color: 'red'}} className="error">{itemError}</div>
               <div style={{ color: 'red'}} className="error">{itemNumberError}</div>


              <tr>
                {" "}
                <th>Total </th> <th></th>
                <th></th>
                <th></th>
                <td>
                  <Form.Control value={total} />
                </td>
              </tr>

              <tr>
                <th>CGST </th>

                <th>
                  <td>14</td>
                </th>
              </tr>
              <tr>
                <th>SGST </th>

                <th>
                  <td>14</td>
                </th>
              </tr>

              <tr>
                {" "}
                <th>Total Payable Amount </th> <th></th>
                <th></th>
                <th></th>
                <td>
                  <Form.Control value={netTotal} />
                </td>
              </tr>
            </tbody>



            <Form.Group className="no-print">
        <Form.Label  className="payment">Payment Method:</Form.Label>
        <ButtonGroup toggle>
          {paymentMethods.map((paymentMethod) => (
            <div key={paymentMethod.value} className="mr-3">
              <Form.Check
                type="radio"
                variant="outline-primary"
                label={paymentMethod.label}
                name="paymentMethod"
                value={paymentMethod.value}
                checked={paymentMethod === paymentMethod.value}
                onChange={(e) => {setPaymentMethod(e.target.value)}}
                
              />
            </div>
          ))}
        </ButtonGroup>
        <div style={{ color: 'red'}} className="error">{paymentError}</div>
      </Form.Group>

            {/* <Form.Group  className="no-print">
              <Form.Label className="payment">Payment Method:</Form.Label><br/>
              {paymentMethods.map((paymentMethod) => (
                <Form.Check
                  
                  key={paymentMethod.value}
                  type="radio"
                  // id={paymentMethod.value}
                  label={paymentMethod.label}
                  name="paymentMethod"
                  value={paymentMethod.value}
                  checked={paymentMehtod === paymentMethod.value}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                  inline
                />
              ))}
            </Form.Group> */}









          </Table>
          <div className="no-print">
            <Button type="submit" className="headerthree" onClick={generateInvoice}>
              Generate Invoice
            </Button>
            <Button type="submit" className="headerthree" >
              paid
            </Button>
          </div>
        </Form>
        <Card.Footer className="invoice-footer">
          <div className="footer">
            <p style={{ color: "black" }}>
             * Thank you for your business! If you have any questions, please
              contact us at vinti@gmail.com.
            </p>
          </div>
        </Card.Footer>
      </Card>
    </div>
    </div>
  );
}

export default Invoice;
