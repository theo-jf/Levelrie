import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './FavoriteItemItem.css';
import DropDown from '../DropDown/DropDown';
import Grid from '@mui/material/Unstable_Grid2';
import BuyCheckbox from '../BuyCheckbox/BuyCheckbox';

// MUI
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

function FavoriteItemItem({item, category, sizes, colors}) {

    let qtyArray = [];

    for (let i = 0; i < 10; i++) {
      qtyArray.push(i);                   
    }

    console.log('this is the item:', item);

    const dispatch = useDispatch();
    useEffect(() => {

    }, []);

    let itemSpecificColors = colors.filter(color => color.name === item.name);
    let itemSpecificSizes = sizes.filter(size => size.name === item.name);

    console.log('HEY COLORS!', colors)

    const changeQty = (e) => {

        // All items added to favorites will automatically be added to the "favorited_solo" table
        // Items being removed will prioritize removing from the "favorited_solo" table before removing from "favorited_items"

        // Don't do anything if the quantity is not changing
        if (Number(e.target.value) != Number(item.count)) {
            // If qty is being decreased
            if (Number(e.target.value) < Number(item.count)) {
                let qtyToRemove = Number(item.count) - Number(e.target.value);
                console.log('REMOVE!', qtyToRemove);
                dispatch({
                    type: 'SAGA_DECREASE_FAVE_QUANTITY',
                    payload: {id : item.id, qtyToRemove: qtyToRemove, category: category}
                });
            } else if (Number(e.target.value) > Number(item.count)) {
                // If qty is being increased
                let qtyToAdd = Number(e.target.value) - Number(item.count);
                dispatch({
                    type: 'SAGA_INCREASE_FAVE_QUANTITY',
                    payload: {id : item.id, qtyToAdd: qtyToAdd, category: category}
                });
                console.log('ADD', qtyToAdd)
            }

        }
    }

    const changeColor = (e) => {
        // Don't do anything if the color is not changing
        if (e.target.value != item.color) {
            dispatch({
                type: 'SAGA_CHANGE_ITEM_COLOR',
                payload: {item: item, newColor: e.target.value}
            });
        }

    }

    const changeSize = (e) => {
        // Don't do anything if the size is not changing
        if (e.target.value != item.size) {
            dispatch({
                type: 'SAGA_CHANGE_ITEM_SIZE',
                payload: {item: item, newSize: e.target.value}
            });
        }
    }

    return (
        <div className='itemItemContainer'>
            <div className='itemItemImage'>
                <img src={item.img} className='itemItemImagePic' />
            </div>
            <div className='itemItemPrice'>
                <Typography className='priceText' sx={{ fontSize: 16 }}>{item.price}</Typography>
            </div>
            <div className='itemItemName'>
                <Typography sx={{ fontSize: 16 }}>{item.name}</Typography>
            </div>
            <div className='itemItemColorLabel'>
                <Typography className='ddLabel' sx={{ fontSize: 14 }}>Color:</Typography>
            </div>
            <div className='itemItemColorDropDown'>
                <select name="color" onChange={changeColor} className='selectDropDown'>
                    {itemSpecificColors.map((color) => {
                        console.log('this is the color:', color)
                        return (
                            <>
                                {color.color === item.color ? <option selected value={item.color}>{item.color}</option> 
                                                      : <option value={color.color}>{color.color}</option>}
                            </>
                        );
                    })}
                </select>
            </div>
            <div className='itemItemSizeLabel'>
                <Typography className='ddLabel' sx={{ fontSize: 14 }}>Size:</Typography>
            </div>
            <div className='itemItemSizeDropDown'>
                <select name="size" onChange={changeSize} className='selectDropDown'>
                    {itemSpecificSizes.map((size) => {
                        console.log('this is the size:', size)
                        return (
                            <>
                                {size.size === item.size ? <option selected value={item.size}>{item.size}</option> 
                                                      : <option value={size.size}>{size.size}</option>}
                            </>
                        );
                    })}
                </select>
            </div>
            <div className='itemItemQuantityLabel'>
                <Typography className='ddLabel' sx={{ fontSize: 14 }}>Qty:</Typography>
            </div>
            <div className='itemItemQuantityDropDown'>
                <select name="quantity" onChange={changeQty} className='selectDropDown'>
                    {/* At the moment, this only supports having favorited an item less than 10 times */}
                    {qtyArray.map((qty) => {
                        console.log(qty)
                        return (
                            <>
                                {Number(qty) === Number(item.count) ? <option selected value={item.count}>{item.count}</option> 
                                                                    : <option value={qty}>{qty}</option>}
                            </>
                        );
                    })}
                </select>
            </div>
            <div className='itemItemBuy'>
                <BuyCheckbox />
            </div>
        </div>


        // <div key={item.id} variant="outlined" className="itemGrid">
        //     <Grid container>

               
        //         <Grid item container xs={4}>
        //             <Stack className='this'>             
        //                 <img src={item.img} />
        //                 <Typography>{item.price}</Typography>
        //             </Stack> 
        //         </Grid>

    
        //         <Grid item container xs={6}>
        //             <Stack>
        //                 <Typography variant="body1" gutterBottom>{item.name}</Typography>
        //                 <DropDown />
        //             </Stack>
        //         </Grid>

              
        //         <Grid xs={2}>       
        //             <BuyCheckbox />
        //         </Grid>
        //     </Grid>
        // </div>
    );
};

export default FavoriteItemItem;