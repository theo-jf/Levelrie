import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import FavoriteOutfitItem from './FavoriteOutfitItem';
import ToggleButton from '../ToggleButton/ToggleButton.jsx';
import FavoriteSearchBar from './FavoriteSearchBar';

// MUI
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


function FavoriteOutfitList() {
    const dispatch = useDispatch();
    const history = useHistory();
    let location = useLocation();
    const user = useSelector((store) => store.user);
    const favoriteOutfits = useSelector(store => store.favorites.favoriteOutfitsReducer);

    const rejectionFits = useSelector(store => store.outfits.rejectionFits);
    const favoriteFits = useSelector(store => store.outfits.favoriteFits);

    const constraint = useSelector(store => store.favorites.constraint);
    const categories = useSelector(store => store.favorites.categories);

    const [highlightedButton, setHighlightedButton] = useState('');

    useEffect(() => {
        
        dispatch({
            type: 'SAGA_FAVORITE_OUTFITS',
            payload: favoriteFits
        });
        
        dispatch({
            type: 'SAGA_REJECT_OUTFITS',
            payload: rejectionFits
        });
        
        dispatch({
            type: 'FETCH_FAVORITE_OUTFITS'
        });
        dispatch({type: 'CLEAR_OUTFITS_TO_REJECT'});
        dispatch({type: 'CLEAR_OUTFITS_TO_FAVORITE'});

        // switch(location.pathname) {
        //     case '/favorites/outfits':
        //         setHighlightedButton('outfit');
        //         break;
        //     case  '/favorites/items':
        //         setHighlightedButton('category');
        //         break;
        // }

        return () => {
            dispatch({
                type: 'CLEAR_FAVORITE_OUTFITS'
            });
        }
    }, []);

    const toggleButtonClicked = (e) => {
        console.log('PASSED???', e.target.value);

        switch(e.target.value) {
            case 'outfit':
                // No need to history.push, you're already here!
                setHighlightedButton('outfit');
                break;
            case 'category':
                history.push('/favorites/items')
                setHighlightedButton('category');
                break;
        }

    }

    console.log('favoriteOutfits is:', favoriteOutfits);
    return (
        <>
        
        <div className="outfitsListSearchBar">
            {/* <p>Favorite Outfit List Page</p> */} 
            <FavoriteSearchBar constraint={constraint} />
        </div>

            <Stack spacing={2}>
            {favoriteOutfits.map(outfit => (
                    <FavoriteOutfitItem key={outfit.id} outfit={outfit}/>
            ))}
            </Stack>
        
        </>

    );
};
export default FavoriteOutfitList;