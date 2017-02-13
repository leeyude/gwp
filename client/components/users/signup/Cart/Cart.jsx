import React from 'react';
import { CropTypes, CropItems } from '../../../../../imports/collections/crops/cropTypes';


export default RegCart = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var availableItems_handle = Meteor.subscribe("availableItems");
    var availableVarieties_handle = Meteor.subscribe("availableVarieties");
    var availableItems =[];
    var availableVarieties =[];

    var user_handle = Meteor.subscribe("currentUser");

    if(availableItems_handle.ready()){
      availableItems = CropItems.find().fetch();
    };
    if(availableVarieties_handle.ready()){
      availableVarieties = CropTypes.find().fetch();
    };


    return {
      availableItems_handle: !availableItems_handle.ready(),
      availableItems: availableItems,
      availableVarieties: availableVarieties,
      userLoading: user_handle.ready(),
      currentUser: Meteor.users.findOne({_id: Meteor.userId()}),
    };
  },

  getInitialState: function() {
    return {
      itemSelected: [], // at the same time, there is only one item selected.
      cartView: false,
      cartEditing: false,
      cartEditingContent: {},
      enteringLineError: 'col-xs-12 hide',
    }
  },

  renderCartInfoRow: function() {
    var cart = this.data.currentUser.profile.cart;
    if(cart.length>0){
      return (
        <div className='cartHeader col-md-12'>
          {this.renderCartTags(cart.length)}
          {this.renderAddTag()}
        </div>
      );
    }else{
      return (
        <div className='cartHeader col-md-12'>
          <div className='addCart' onClick={this.addEmptyCart}>
            <h3>新增菜車</h3>
          </div>
        </div>
      );
    }
  },

  renderCartTags: function(numCarts){
    var cartDescriptions = ['菜車一','菜車二','菜車三','菜車四','菜車五','菜車六','菜車七',];
    var renderDescriptions = cartDescriptions.slice(0, numCarts);

    var cartTag = renderDescriptions.map(function(item){
      var location = renderDescriptions.indexOf(item);

      if(this.state.cartView===location){


        return (

          <div key={item} className='cartTag selectedCartTag'>
            <h3>{item}</h3>
            <i className="fa fa-minus-circle fa-2" aria-hidden="true" onClick={(e) => this.deleteCart(location)}></i>
          </div>
        );
      }else{

        return (
          <div key={item} className='cartTag'  onClick={(e)=>this.selectCartTag(location)}>
            <h3>{item}</h3>
            <i className="fa fa-minus-circle fa-2" aria-hidden="true" onClick={(e) => this.deleteCart(location)}></i>
          </div>
        );
      }
    }.bind(this));

    return cartTag;
  },

  addEmptyCart(e){
    e.preventDefault();

    Meteor.call("addEmptyCart", function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

      }
    });
  },

  deleteCart: function(location){
    this.setState({cartView: false});

    Meteor.call("deleteCart",location, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

      }
    });
  },

  renderAddTag: function(){
    var cart = this.data.currentUser.profile.cart;

    if(cart.length==7){
      return null;
    }else{
      return (
        <div className='addCartCross' onClick={this.addEmptyCart}>
          <h3>+</h3>
        </div>
      );
    }
  },

  selectCartTag: function(location){
    this.setState( { cartView: location});
    this.setState( { cartEditing: false});
    this.setState({ itemSelected: []});

  },

  cartDeliveryDay: function(){
    var cartSelection = this.state.cartView;

    var currentUser = this.data.currentUser;

    if(currentUser.profile.cart[cartSelection]){
      var selectedDeliveryDays = currentUser.profile.cart[cartSelection].deliveryDays;
      var weekdays = ['SUN','MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      var weekdaysCharacters = ['日','一', '二', '三', '四', '五', '六'];

      var weekdaysOutput = weekdays.map(function(thisDay){
        var dayFilter = selectedDeliveryDays.every(day => day!=thisDay);
        // dayFilter false means one of the selected Delivery Days has the same value with 'thisDay'.
        if(!dayFilter){
          for(j=0;j<7;j++){
            if(weekdays[j]==thisDay){
              return (
                <div key={thisDay} onClick={(e)=> this.changeDeliveryDay(thisDay)} className='cartDay deliveryPick'>
                  {weekdaysCharacters[j]}
                </div>
              )
            }
          }
        }else{
          for(j=0;j<7;j++){

            if(weekdays[j]==thisDay){
              return (
                <div key={thisDay} onClick={(e)=> this.changeDeliveryDay(thisDay)} className='cartDay'>
                  {weekdaysCharacters[j]}
                </div>
              )
            }
          }
        }

      }.bind(this));

      return weekdaysOutput;
    }else{
      // when no cart item is returned;
      var weekdays = ['SUN','MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      var weekdaysCharacters = ['日','一', '二', '三', '四', '五', '六'];


      var weekdaysOutput = weekdays.map(function(thisDay){
        for(j=0;j<7;j++){
          if(weekdays[j]==thisDay){
            return (
              <div key={thisDay} className='cartDay'>
                {weekdaysCharacters[j]}
              </div>
            )
          }
        }

      }.bind(this));

      return weekdaysOutput;
    };

  },

  changeDeliveryDay: function(thisDay){
    var cartSelection = this.state.cartView;

    var currentUser = this.data.currentUser;
    var selectedDeliveryDays = currentUser.profile.cart[cartSelection].deliveryDays;

    var thisDayNotExists = selectedDeliveryDays.every(day => day!=thisDay);

    if(thisDayNotExists){
      Meteor.call("addDeliveryDay", cartSelection, thisDay, function(error, result){
        if(error){
          console.log("error", error);
        }
      });
    }else{
      Meteor.call("removeDeliveryDay", cartSelection, thisDay, function(error, result){
        if(error){
          console.log("error", error);
        }
      });
    }
  },

  renderCartContent: function(){
    var selectedCart = this.state.cartView;
    var currentUser = this.data.currentUser;

    if(selectedCart || selectedCart===0){
      // A cart is selected

      return (
        <div className='col-md-12'>
          <div className='cartDetail'>
            <div className='cartDetailContainer'>
              <div className='cartDetailControl'>
                {this.renderControlOptions()}

                <div className='cartDaysRow'>
                  <div className='cartDaysTitle'>
                    送菜日：
                  </div>

                  <div className='cartDaysBlock'>
                    {this.cartDeliveryDay()}
                  </div>
                </div>
              </div>


              <div className='cartDetailList'>
                {this.editItem()}
                {this.cartItems( currentUser.profile.cart[selectedCart] )}
              </div>

            </div>

            <div className='budgetThisCart clearfix'>
              <div className='budgetThisCartSum'>
                ${this.cartBudgetSum()}
              </div>
              <div className='budgetThisCartTitle'>
                <h4>本次運送總預算：</h4>
              </div>
            </div>

            <div className='costThisCart clearfix'>
              <div className='costThisCartSum'>
                ${this.cartCostSum()}
              </div>
              <div className='costThisCartTitle'>
                <h4>本次運送預估總價：</h4>
              </div>
            </div>

            <div className='savingThisCart clearfix'>

              <div className='savingThisCartSum'>
                ${this.cartSavingSum()}
              </div>

              <div className='savingThisCartTitle'>
                <h4>本次運送共節省：</h4>
              </div>
            </div>

          </div>
        </div>
      );
    }else{
      // No cart is selected
      return (
        <div className='col-md-12'>
          <div className='cartDetail'>
            <div className='cartDetailContainer'>
              {this.messageWhenEmpty()}
            </div>

          </div>
        </div>
      );
    };
  },

  cartItems: function( thisCart ){
    if(thisCart.cropItems.length>0){
      return thisCart.itemDetails.map(function(eachItem){
        var cartNum = this.state.cartView;

        return (
          <div key={eachItem.itemId} className='cartDetailItem' onClick={(e) => this.deleteCartItem(cartNum, eachItem)}>
            <div className='deleteItem'>
              <i className="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
            <div className='cartDetailItemLeft'>
              <div className='itemName'>
                <h3>{eachItem.itemName}</h3>
              </div>
              <div className='itemGrade'>
                <div className='itemGradeRow'>
                  <div className='itemGradeSelection'>
                    <h4>{eachItem.grade}</h4>
                  </div>
                  <div className='itemGradeTitle'>
                    <h4>品級：</h4>
                  </div>

                </div>
              </div>
            </div>
            <div className='cartDetailItemRight'>
              <div className='inputDetailHeader'>

                <div className='col-xs-4 col-xs-offset-2 purchaseHeader'>
                  <div className='row'>
                    採購計畫
                  </div>
                  <div className='row purchaseHeaderItem'>
                    <div className='col-xs-6'>
                      <div className='row'>
                        預算($/KG)
                      </div>
                    </div>
                    <div className='col-xs-6'>
                      <div className='row'>
                        數量(KG)
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-xs-5 estimateHeader'>
                  <div className='row'>
                    交易與市場預估
                  </div>
                  <div className='row estimateHeaderItem'>
                    <div className='col-xs-4'>
                      <div className='row'>
                        成交價
                      </div>
                    </div>
                    <div className='col-xs-4'>
                      <div className='row'>
                        節省($)
                      </div>

                    </div>
                    <div className='col-xs-4'>
                      <div className='row'>
                        到貨率(%)
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {this.displayItemLine(eachItem)}

            </div>
          </div>
        );
      }.bind(this));
    }else{
      if(!this.state.cartEditing){
        return (
          <div className='cartDetailEmpty'>
            <h4>目前菜車是空的</h4>
          </div>
        );
      }
    };
  },

  displayItemLine: function(eachItem){
    return eachItem.varietySelections.map(varietyObject => (
     <div key={varietyObject.varietyName} className='inputDetailEntries entered'>
       <div className='col-xs-2'>
         <div className='row'>
           <h4>{varietyObject.varietyName}</h4>
         </div>
       </div>
       <div className='col-xs-4'>
         <div className='row'>
           <div className='col-xs-6'>
             <div className='row itemBudget'>
               ${varietyObject.varietyPrice}
             </div>
           </div>
           <div className='col-xs-6'>
             <div className='row itemVolume'>
               {varietyObject.varietyVolume}
             </div>
           </div>
         </div>
       </div>
       <div className='col-xs-5'>
         <div className='row'>
           <div className='col-xs-4'>
             <div className='info'>
               $33
             </div>
           </div>
           <div className='col-xs-4'>
             <div className='info'>
               $ 9
             </div>
           </div>
           <div className='col-xs-4'>
             <div className='info'>
               >99%
             </div>
           </div>

         </div>
       </div>
     </div>
   ));
  },

  deleteCartItem: function(cartNum, eachItem){
    var itemLoc = this.data.currentUser.profile.cart[cartNum].itemDetails.indexOf(eachItem);

    Meteor.call("deleteCartItem", cartNum, itemLoc, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

      }
    });
  },

  cartBudgetSum: function(){
    var thisCart = this.data.currentUser.profile.cart[this.state.cartView];
    var budgetSum = 0;

    if(thisCart.itemDetails.length>0){// there is at least one item in the cart.
      thisCart.itemDetails.map(function(eachItem){
        eachItem.varietySelections.map(function(eachVariety){
          var itemBudget = eachVariety.varietyPrice * eachVariety.varietyVolume;
          budgetSum = budgetSum + itemBudget;
        });
      });
    };

    return budgetSum.toLocaleString();
  },

  cartCostSum: function(){
    var thisCart = this.data.currentUser.profile.cart[this.state.cartView];
    var costSum = 0;

    if(thisCart.itemDetails.length>0){// there is at least one item in the cart.
    };
    return costSum;
  },

  cartSavingSum: function(){
    var thisCart = this.data.currentUser.profile.cart[this.state.cartView];
    var savingSum = 0;

    if(thisCart.itemDetails.length>0){// there is at least one item in the cart.
    };
    return savingSum;
  },


  messageWhenEmpty: function(){
    if(this.data.currentUser.profile.cart.length>0){// check whether there is a cart in data.
      if(!this.state.cartView){// check whether the user selected a cart
        return (
          <h3 className='emptyMessage'>
            請點選您的菜車
          </h3>
        );
      }
    }else{
      // This user has no cart.
      return (
        <h3 className='emptyMessage'>
          請新增一台採購菜車
        </h3>
      );
    }
  },

  renderControlOptions: function(){
    if(this.state.cartEditing){// current cart is under editing
      return (
        <div className='cartDetailCancelEdit' onClick={this.cancelCartEdit}>
          <h3>取消編輯</h3>
        </div>
      );
    }else{// current cart isn't under editing
      var currentUser = this.data.currentUser; // get data of the cart
      var selectedCart = this.state.cartView; // get selected cart

      if(this.data.availableItems){
        if( currentUser.profile.cart[selectedCart].cropItems.length == this.data.availableItems.length){// the number of total items in cart is equal to total available items
          return (
            <div className='cartDetailNoItem'>
              <h3>無可選品項</h3>
            </div>
          );
        }else{
          return (
            <div className='cartDetailAddItem' data-toggle="modal" data-target="#cartDetailAddItem">
              <h3>新增品項</h3>
            </div>
          );
        }
      }


    }
  },

  servingItems(){
    var selectedCart = this.state.cartView; // get selected cart
    var currentUser = this.data.currentUser; // get data of the cart
    var itemsUnderEdit = this.state.cartEditing; // get data under editing

    if(selectedCart|| selectedCart===0){
      // A cart is selected.
      // Check whether the cart is empty.
      if(currentUser.profile.cart[selectedCart].cropItems.length>0){
        // there is cropItems in the cart.
        if(this.state.cartEditing.length>0){// there is items under editing

          var itemsInCart = currentUser.profile.cart[selectedCart].cropItems;
          var itemsUnderEdit = this.state.cartEditing;
          var itemsToBeListed = this.data.availableItems.filter(function(eachItem){
            return itemsInCart.every(item => item!=eachItem._id)&&itemsUnderEdit.every(item => item!=eachItem._id);
          });

          var listedItems = itemsToBeListed.map(function(crop){
            var itemSelected = this.state.itemSelected; // gets whatever crop items stored in State.

            var selectedItem =0;
            for(i=0; i<itemSelected.length; i++){
              if(itemSelected[i]===crop._id){
                selectedItem++;
              }
            };

            if(selectedItem>0){
              // Some of the crop items are selected.
              return(
                <div key={crop._id} className='isServing selected' onClick={(e)=>this.selectItem(crop)}>
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle-thin fa-stack-2x" aria-hidden="true">
                    </i>
                    <i className="fa fa-check fa-stack-1x" aria-hidden="true">
                    </i>
                  </span>
                  <h6>{crop.name_crop}</h6>
                </div>
              );
            }else{
              // None of the crop items is selected.
              return(
                <div key={crop._id} className='isServing' onClick={(e)=>this.selectItem(crop)}>
                <span className="fa-stack fa-lg">
                  <i className="fa fa-circle-thin fa-stack-2x" aria-hidden="true">
                  </i>

                </span>

                <h6>{crop.name_crop}</h6>
                </div>
              );
            }
          }.bind(this));
          return listedItems;
        }else{ // No item is under editing

          var itemsInCart = currentUser.profile.cart[selectedCart].cropItems;
          var itemsToBeListed = this.data.availableItems.filter(function(eachItem){
            return itemsInCart.every(item => item!=eachItem._id);
          });

          var listedItems = itemsToBeListed.map(function(crop){
            var itemSelected = this.state.itemSelected; // gets whatever crop items stored in State.

            var selectedItem =0;
            for(i=0; i<itemSelected.length; i++){
              if(itemSelected[i]===crop._id){
                selectedItem++;
              }
            };

            if(selectedItem>0){
              // Some of the crop items are selected.
              return(
                <div key={crop._id} className='isServing selected' onClick={(e)=>this.selectItem(crop)}>
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle-thin fa-stack-2x" aria-hidden="true">
                    </i>
                    <i className="fa fa-check fa-stack-1x" aria-hidden="true">
                    </i>
                  </span>
                  <h6>{crop.name_crop}</h6>
                </div>
              );
            }else{
              // None of the crop items is selected.
              return(
                <div key={crop._id} className='isServing' onClick={(e)=>this.selectItem(crop)}>
                <span className="fa-stack fa-lg">
                  <i className="fa fa-circle-thin fa-stack-2x" aria-hidden="true">
                  </i>

                </span>

                <h6>{crop.name_crop}</h6>
                </div>
              );
            }
          }.bind(this));
          return listedItems;
        }
      }else{
        // No cropItem exists in the cart.
        if(this.state.cartEditing){// there is items under editing

          var itemsUnderEdit = this.state.cartEditing;
          var itemsToBeListed = this.data.availableItems.filter(function(eachItem){
            return itemsUnderEdit.every(item => item!=eachItem._id);
          });

          var listedItems = itemsToBeListed.map(function(crop){
            var itemSelected = this.state.itemSelected; // gets whatever crop items stored in State.

            var selectedItem =0;
            for(i=0; i<itemSelected.length; i++){
              if(itemSelected[i]===crop._id){
                selectedItem++;
              }
            };

            if(selectedItem>0){
              // Some of the crop items are selected.
              return(
                <div key={crop._id} className='isServing selected' onClick={(e)=>this.selectItem(crop)}>
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle-thin fa-stack-2x" aria-hidden="true">
                    </i>
                    <i className="fa fa-check fa-stack-1x" aria-hidden="true">
                    </i>
                  </span>
                  <h6>{crop.name_crop}</h6>
                </div>
              );
            }else{
              // None of the crop items is selected.
              return(
                <div key={crop._id} className='isServing' onClick={(e)=>this.selectItem(crop)}>
                <span className="fa-stack fa-lg">
                  <i className="fa fa-circle-thin fa-stack-2x" aria-hidden="true">
                  </i>

                </span>

                <h6>{crop.name_crop}</h6>
                </div>
              );
            }
          }.bind(this));
          return listedItems;

        }else{ // No item is under editing
          var listedItems = this.data.availableItems.map(function(crop){
            var itemSelected = this.state.itemSelected; // gets whatever crop items stored in State.

            var selectedItem =0;
            for(i=0; i<itemSelected.length; i++){
              if(itemSelected[i]===crop._id){
                selectedItem++;
              }
            };

            if(selectedItem>0){
              // Some of the crop items are selected.
              return(
                <div key={crop._id} className='isServing selected' onClick={(e)=>this.selectItem(crop)}>
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle-thin fa-stack-2x" aria-hidden="true">
                    </i>
                    <i className="fa fa-check fa-stack-1x" aria-hidden="true">
                    </i>
                  </span>
                  <h6>{crop.name_crop}</h6>
                </div>
              );
            }else{
              // None of the crop items is selected.
              return(
                <div key={crop._id} className='isServing' onClick={(e)=>this.selectItem(crop)}>
                <span className="fa-stack fa-lg">
                  <i className="fa fa-circle-thin fa-stack-2x" aria-hidden="true">
                  </i>

                </span>

                <h6>{crop.name_crop}</h6>
                </div>
              );
            }
          }.bind(this));
          return listedItems;
        }
      }
    }else{
      // No cart is selected. So no data to render.

    };
  },

  selectItem(crop){
    var itemSelected = this.state.itemSelected; // gets whatever crop items stored in State.
    if(itemSelected.length==0){
      itemSelected.push(crop._id);
    }else{
      itemSelected[0]=crop._id;
    };

    this.setState( { itemSelected: itemSelected} );
    return false;
  },

  addItemToEdit: function(e){
    e.preventDefault();
    var getSelectedItem = this.state.itemSelected;
    var itemObject = CropItems.findOne({_id: getSelectedItem[0]});

    var itemDetails = {
      itemId: getSelectedItem[0],
      itemName: itemObject.name_crop,
      grade: '特',
      varietySelections: [],
    };

    this.setState( { cartEditing: getSelectedItem});
    this.setState( { cartEditingContent: itemDetails} );

    return false;
  },

  cancelCartEdit: function(e){
    e.preventDefault();
    this.setState( { cartEditing: false});
    this.setState( { itemSelected: []});
    this.setState( { cartEditingContent: {}});

    return false;
  },

  editItem: function(){
    var itemObject = this.state.cartEditingContent;

    if(this.state.cartEditing){ // an item is selected for edit
      return (
        <div className='cartDetailItem editing'>
          <div className='cartDetailItemLeft'>
            <div className='itemName'>
              <h3>{itemObject.itemName}</h3>
            </div>
            <div className='itemGrade'>
              <div className='itemGradeRow'>
                <div className='itemGradeSelection'>
                  <select id='itemGrade' onChange={this.setItemGrade}>
                    <option>特</option>
                    <option>優</option>
                    <option>良</option>
                  </select>
                </div>
                <div className='itemGradeTitle'>
                  <h4>品級：</h4>
                </div>

              </div>
            </div>
          </div>
          <div className='cartDetailItemRight'>
            <div className='inputDetailHeader'>

              <div className='col-xs-4 col-xs-offset-2 purchaseHeader'>
                <div className='row'>
                  採購計畫
                </div>
                <div className='row purchaseHeaderItem'>
                  <div className='col-xs-6'>
                    <div className='row'>
                      預算($/KG)
                    </div>
                  </div>
                  <div className='col-xs-6'>
                    <div className='row'>
                      數量(KG)
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xs-5 estimateHeader'>
                <div className='row'>
                  交易與市場預估
                </div>
                <div className='row estimateHeaderItem'>
                  <div className='col-xs-4'>
                    <div className='row'>
                      成交價
                    </div>
                  </div>
                  <div className='col-xs-4'>
                    <div className='row'>
                      節省($)
                    </div>

                  </div>
                  <div className='col-xs-4'>
                    <div className='row'>
                      到貨率(%)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {this.enteringLine(itemObject.itemName)}
            {this.displayLine()}
            {this.saveEntriesRow()}
          </div>
        </div>
      );
    };
  },

  setItemGrade: function(e){
    e.preventDefault();
    var itemDetails = this.state.cartEditingContent;
    itemDetails.grade = $('#itemGrade').val();
    this.setState( { cartEditingContent: itemDetails} );
  },

  enteringLine: function(itemName){
    var itemDetails = this.state.cartEditingContent;
    // to check whether 不分品種 exists-> if yes, remove the option in the list

    var vareities = CropTypes.find({name_crop: itemName}).fetch();
    var varietyOptions = vareities.map(function(varietyObject){

      if(itemDetails.varietySelections.every(item => item.varietyName != varietyObject.name_variety)){ // this selected has not been selected
        return true;
      };
    });

    if(varietyOptions.every(x => x!=true)){
      // the entry line is not return due to all options have been rendered.

    }else{
      if(itemDetails.varietySelections.every(item => item.varietyName != '不分品種')){ // no entry is selected as 不分品種
        return (
          <div className='inputDetailEntries entering'>
            <div className='col-xs-2'>
              <div className='row'>
                <select id='variety'>
                  <option>不分品種</option>
                  {this.renderVarietyOptions(itemName)}
                </select>

              </div>
            </div>
            <div className='col-xs-4'>
              <div className='row'>
                <div className='col-xs-6'>
                  <div className='row itemBudget'>
                    <i>$</i>
                    <input id='budget' placeholder='0'></input>
                  </div>
                </div>
                <div className='col-xs-6'>
                  <div className='row itemVolume'>
                    <input id='volume' placeholder='0'></input>
                    <i>kg</i>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xs-5'>
              <div className='row'>
                <div className='col-xs-4'>
                  <div className='info'>
                    $ 33
                  </div>
                </div>
                <div className='col-xs-4'>
                  <div className='info'>
                    $ 9
                  </div>
                </div>
                <div className='col-xs-4'>
                  <div className='info'>
                    >99%
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xs-1'>
              <div className='row'>
                <i className="fa fa-check-circle-o confirm" aria-hidden="true" onClick={this.addVariety}></i>
              </div>
            </div>
            <div className={this.state.enteringLineError}>
              <h6>請在預算與數量都輸入數字</h6>
            </div>
          </div>
        );
      }else{
        if(vareities.length==1&& !vareities.name_variety){

        }else{
          return (
            <div className='inputDetailEntries entering'>
              <div className='col-xs-2'>
                <div className='row'>
                  <select id='variety'>
                    {this.renderVarietyOptions(itemName)}
                  </select>

                </div>
              </div>
              <div className='col-xs-4'>
                <div className='row'>
                  <div className='col-xs-6'>
                    <div className='row itemBudget'>
                      <i>$</i>
                      <input id='budget'></input>
                    </div>
                  </div>
                  <div className='col-xs-6'>
                    <div className='row itemVolume'>
                      <input id='volume'></input>
                      <i>kg</i>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xs-5'>
                <div className='row'>
                  <div className='col-xs-4'>
                    <div className='info'>
                      $ 33
                    </div>
                  </div>
                  <div className='col-xs-4'>
                    <div className='info'>
                      $ 9
                    </div>
                  </div>
                  <div className='col-xs-4'>
                    <div className='info'>
                      >99%
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xs-1'>
                <div className='row'>
                  <i className="fa fa-check-circle-o confirm" aria-hidden="true" onClick={this.addVariety}></i>
                </div>
              </div>
              <div className={this.state.enteringLineError}>
                <h6>請在預算與數量都輸入數字</h6>
              </div>
            </div>
          );
        };
      };
    };
  },

  renderVarietyOptions: function(itemName){


    var itemDetails = this.state.cartEditingContent;
    var vareities = CropTypes.find({name_crop: itemName}).fetch();

    return vareities.map(function(varietyObject){
      if(varietyObject.name_variety){
        if(itemDetails.varietySelections.every(item => item.varietyName != varietyObject.name_variety)){ // this selected has not been selected
          return (
            <option key={varietyObject._id}>{varietyObject.name_variety}</option>
          );
        };
      };
    });
  },

  addVariety: function(){
    var variety = $('#variety').val();
    var budget = $('#budget').val();
    var volume = $('#volume').val();

    if(Number(budget)&&Number(volume)){ // both budget and volume are numbers.
      this.setState({ enteringLineError: 'col-xs-12 hide'});

      var itemDetails = this.state.cartEditingContent;
      itemDetails.varietySelections.push({
        varietyName: variety,
        varietyPrice: Number(budget),
        varietyVolume: Number(volume),
      });

      this.setState({cartEditingContent: itemDetails});
      $('#budget').val(0);
      $('#volume').val(0);
      /*
          var itemDetails = {
            itemName: itemObject.name_crop,
            grade: gradeNames[0],
            varietySelections: [],
          };
      */
    }else{ // ask for number input.
      this.setState({ enteringLineError: 'col-xs-12 error'});
    };
  },

  displayLine: function(){
      var itemDetails = this.state.cartEditingContent;
      if(itemDetails.varietySelections.length>0){ // there are selected variety lines

        return itemDetails.varietySelections.map(varietyObject => (
         <div key={varietyObject.varietyName} className='inputDetailEntries entered'>
           <div className='col-xs-2'>
             <div className='row'>
               <h4>{varietyObject.varietyName}</h4>
             </div>
           </div>
           <div className='col-xs-4'>
             <div className='row'>
               <div className='col-xs-6'>
                 <div className='row itemBudget'>
                   ${varietyObject.varietyPrice}
                 </div>
               </div>
               <div className='col-xs-6'>
                 <div className='row itemVolume'>
                   {varietyObject.varietyVolume}
                 </div>
               </div>
             </div>
           </div>
           <div className='col-xs-5'>
             <div className='row'>
               <div className='col-xs-4'>
                 <div className='info'>
                   $33
                 </div>
               </div>
               <div className='col-xs-4'>
                 <div className='info'>
                   $ 9
                 </div>
               </div>
               <div className='col-xs-4'>
                 <div className='info'>
                   >99%
                 </div>
               </div>

             </div>
           </div>
           <div className='col-xs-1'>
             <div className='row'>
               <i className="fa fa-times-circle-o remove" aria-hidden="true" onClick={(e)=>this.removeVariety(varietyObject)}></i>
             </div>
           </div>
         </div>
       ));

      };

  },

  removeVariety: function(varietyObject){
    var itemDetails = this.state.cartEditingContent;
    var index = itemDetails.varietySelections.indexOf(varietyObject);

    itemDetails.varietySelections.splice(index, 1);
    this.setState({cartEditingContent: itemDetails});
    $('#budget').val(0);
    $('#volume').val(0);
  },

  saveEntriesRow: function(){
    var itemDetails = this.state.cartEditingContent;
    if(itemDetails.varietySelections.length>0){ // there is at least one entry in the temp storage.
      return (
        <div className='col-xs-12 saveRow'>
          <div className='saveThisEntry' onClick={this.saveThisEntry}>
            儲存
          </div>
        </div>
      );
    }
  },

  saveThisEntry: function(e){
    e.preventDefault();
    var itemDetails = this.state.cartEditingContent;
    var itemId = this.state.cartEditing[0];
    var cartNum = this.state.cartView;
    var thisCartDetails = this.data.currentUser;

    Meteor.call("insertItemToCart", cartNum, itemId, itemDetails, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        console.log(result);

      }
      this.setState({ cartEditing: false});
      this.setState({ itemSelected: []} );
      this.setState({ cartEditingContent: {}});
      console.log("is executed");
    }.bind(this));
  },

  render(){
    return (
      <div>
        <div id="regCart">
          <div className="regCart-box clearfix">
            <div className="regCart-content">
              <div className="row">
                <div className="col-xs-8 col-sm-7 col-md-8">
                  <form className='cartForm'>
                    <div className='cartInfo'>
                      <div className='cartGreeting row'>
                        <div className='col-md-12'>
                          <i className="fa fa-opencart" aria-hidden="true"></i>
                          <h3>老闆，叫些什麼菜？</h3>
                          <div className='form-divider'>

                        </div>

                        </div>
                      </div>

                      <div className='cartBody'>
                        <div className='row'>
                        {this.renderCartInfoRow()}
                        </div>

                        <div className='row cartDetailRow'>
                          {this.renderCartContent()}
                        </div>


                      </div>



                      <div className='row'>
                      </div>
                      <div className='row'>
                      </div>
                    </div>
                    <div className='additionalInfo'>
                    </div>
                  </form>
                </div>
                <div className="col-xs-4 col-sm-5 col-md-4">
                  <div className='allCartSummaryColumn'>
                    <div className='allCartSummaryHeader'>
                      <h3>一週總覽</h3>
                    </div>
                    <div className='allCartSummaryRow'>
                      <h3>一週總覽</h3>
                    </div>
                    <div className='allCartSummaryRow'>
                      <h3>一週總覽</h3>
                    </div>
                    <div className='goToPlanConfirmation'>
                      前往基本資料
                    </div>
                  </div>

                </div>
              </div>

              <div id="cartDetailAddItem" className="modal fade" role="dialog">
                <div className="modal-dialog">

                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="close" data-dismiss="modal">&times;</div>
                      <h2 className="modal-title">新增品項</h2>
                    </div>
                    <div className="modal-body">
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='servingItemsLabel'>
                            <h4>
                              服務品項：
                            </h4>
                          </div>

                          <div className='servingItems cartEditBlock'>
                            {this.servingItems()}
                          </div>
                        </div>
                      </div>




                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn modalAddItem" data-dismiss="modal" onClick={this.addItemToEdit}>新增</button>
                      <button type="button" className="btn modalCancelAdd" data-dismiss="modal">取消</button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>


    )
  }
});
