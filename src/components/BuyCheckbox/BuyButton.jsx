import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';


export default function BuyButton({ outfit }) {
    const history = useHistory()
    const dispatch = useDispatch()

    const buyThisFit = () => {
        console.log('outfit buy button', outfit);
        dispatch({
                type: 'SAGA_ADDCART_OUTFIT',
                payload: outfit
            })
      }
    

    return(
        <Button variant='contained' onClick={buyThisFit} sx={{width:.8}}>Purchase Items</Button>
    )
}