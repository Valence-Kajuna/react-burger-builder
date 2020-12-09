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
                value: ''
            },

            street: {
                elementtype: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementtype: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementtype: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementtype: 'select',
                elementConfig:{
                    options:[{value: 'fastest', displayValue: 'Fastest '},{value:'cheapest', displayValue: 'Cheapest'}]
                },
                value: ''
            }
            
        },
        loading: false
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
        updatedOrderForm[inputIdentifier] = updatedFormElement
        this.setState({orderForm: updatedOrderForm});
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
            {formElementArray.map(formElement => <Input changed= {(event)=>this.inputChangedHandler(event,formElement.id)} key={formElement.id} elementtype={formElement.config.elementtype} elementConfig={formElement.config.elementConfig} value={formElement.config.value}/>)}
            
            <Button btnType="Success" clicked={this.OrderHandler}>ORDER</Button>
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