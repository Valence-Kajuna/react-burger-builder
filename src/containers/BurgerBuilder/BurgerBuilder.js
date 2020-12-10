import React, { Component } from "react";
import Aux from "../../components/hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{
    
    state ={
        ingredients:null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }
    componentDidMount() {
        // axios.get('https://react-burger-project-3ccd0-default-rtdb.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data})
        // }
        // );
    }   
    

    updatePurchaseState (ingredients){

        const sum =  Object.keys(ingredients).map((ingKey)=>{
            return ingredients[ingKey];
        }).reduce((sum,el)=>{return sum+el;},0);

        console.log("sum is "+sum);


        this.setState({purchasable : sum>0});
    }

    addIngredientHandler = (type) => {
    
        const oldCount = this.state.ingredients[type];
        
        const updatedCount = oldCount +1;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice =  this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];

        if(oldCount <=0){
            return;
        }
        
        const updatedCount = oldCount -1;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice =  this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
       
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = ()=>(
        this.setState({purchasing: true})
    );
    
    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = ()=>{
    
        const queryParams = []; 
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+ this.state.totalPrice);

        const queryString = queryParams.join('&');
    this.props.history.push({
        pathname: '/checkout',
        search: '?'+queryString
    });

    }
    

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }
        let orderSummary = null;


        if(this.state.loading){
            orderSummary = <Spinner />
        }
        let burger = <Spinner />

        if(this.state.ingredients){
            burger =(
                <Aux>
                     <Burger ingredients={this.state.ingredients}/>
                    <BuildControls purchasable={this.state.purchasable} price = {this.state.totalPrice} ingredientAdded = {this.addIngredientHandler} ingredientRemoved = {this.removeIngredientHandler} disabled={disabledInfo} ordered={this.purchaseHandler}/>
                </Aux>
            ) 

            orderSummary = <OrderSummary price = {this.state.totalPrice} ingredients={this.state.ingredients}  purchaseCancelled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler}/>;  
        }
        

        return(
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
               {burger}
            </Aux>
        );
    }
 
}

export default withErrorHandler(BurgerBuilder, axios) ;