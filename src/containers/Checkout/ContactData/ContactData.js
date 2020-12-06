import React, { Component } from 'react';
import Button from '../../../components/UI/Button/button'; 
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
 
class ContactData extends Component{
    state ={
        name: '',
        email:'',
        address:{
            street: '',
            postalCode: ''
        },
        loading: false
    }

    OrderHandler = (event) =>{
            event.preventDefault();
            this.setState({loading:true})
           // alert("You continued");
           const order ={
               ingredients: this.props.ingredients,
               price: this.props.price,
               customer: {
                   name: 'Valence Kajuna',
                   address: {
                        street: 'Sokoine Street',
                        zipCode: '1100',
                       country: 'Tanzania'
                   },
                   email: 'valencekajuna@yahoo.com'
               },
               deliveryMethod: 'fastest'
           }
           axios.post('/orders.json',order).then(response =>
               {this.setState({loading:false})
                this.props.history.push('/');
            }).catch((error) => {
               console.log(error);
               this.setState({loading:false});
           })
    }

    render(){
        let form = (<form>
            <input type="text" name='name' placeholder='Your name' />
            <input type="email" name='email' placeholder='Your Email' />
            <input type="text" name='street' placeholder='Street' />
            <input type="text" name='postal' placeholder='Postal Code' />
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