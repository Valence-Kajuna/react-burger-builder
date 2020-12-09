import React, { Component } from 'react';
import Button from '../../../components/UI/Button/button'; 
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/UI/Input/input';

class ContactData extends Component{
    state ={
        orderForm:{
            
            name:{
                elementtype: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },

            street: {
                elementtype: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementtype: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementtype: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementtype: 'select',
                elementConfig:{
                    options:[{value: 'fastest', displayValue: 'Fastest '},{value:'cheapest', displayValue: 'Cheapest'}]
                },
                value: 'fastest',
                validation:{},
                valid: true
            }
            
        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value,rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim()!=='' && isValid===true;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid===true
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid===true
        }

        return isValid;
    }
    
    OrderHandler = (event) =>{
        event.preventDefault();
        this.setState({loading:true})
        // alert("You continued");
       let formData = {};
       for(let elementIdentifier in this.state.orderForm){
           formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value
       }
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json',order).then(response =>
            {this.setState({loading:false})
            this.props.history.push('/');
        }).catch((error) => {
            console.log(error);
            this.setState({loading:false});
        })
    }

    inputChangedHandler = (event, inputIdentifier) =>{
       let updatedOrderForm = {
            ...this.state.orderForm
        }

        let updatedFormElement ={
            ...updatedOrderForm[inputIdentifier]
        }

       
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
        console.log(updatedFormElement);
    }
    
    render(){
        const formElementArray =[];
        for(let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key],

            })
        }

        // console.log(formElementArray);

        let form = (<form>
            {formElementArray.map(formElement => <Input touched = {formElement.config.touched} shouldValidate={formElement.config.validation} invalid={!formElement.config.valid} changed= {(event)=>this.inputChangedHandler(event,formElement.id)} key={formElement.id} elementtype={formElement.config.elementtype} elementConfig={formElement.config.elementConfig} value={formElement.config.value}/>)}
            
            <Button btnType="Success" dis={!this.state.formIsValid} clicked={this.OrderHandler}>ORDER</Button>
            </form>);
            if (this.state.loading){
                form = <Spinner />
            }
            return (
                
                <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
                </div>
                )
            }
        }
        
        
        export default withRouter(ContactData) ;