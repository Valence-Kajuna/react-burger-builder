import React, { Component } from "react";
import Aux from "../../components/hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import { connect } from "react-redux";

import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component{
    
    state ={ 
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


        return sum>0;
    }

    purchaseHandler = ()=>(
        this.setState({purchasing: true})
    );
    
    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = ()=>{
        this.props.history.push('/checkout');
    }
    

    render(){
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }
        let orderSummary = null;


        if(this.state.loading){
            orderSummary = <Spinner />
        }
        let burger = <Spinner />

        if(this.props.ings){
            burger =(
                <Aux>
                     <Burger ingredients={this.props.ings}/>
                    <BuildControls purchasable={this.updatePurchaseState(this.props.ings)} price = {this.props.price} ingredientAdded = {this.props.onIngredientAdded} ingredientRemoved = {this.props.onIngredientRemoved} disabled={disabledInfo} ordered={this.purchaseHandler}/>
                </Aux>
            ) 

            orderSummary = <OrderSummary price = {this.props.price} ingredients={this.props.ings}  purchaseCancelled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler}/>;  
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

const mapStateToProps = state =>{
    return {
        ings : state.ingredients,
        price : state.totalPrice
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded : (ingName) =>dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
        onIngredientRemoved : (ingName) =>dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios)) ; 