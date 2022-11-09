import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import FavoriteOutfitItem from './FavoriteOutfitItem';

// MUI
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function FavoriteOutfitList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);
    // const favoriteOutfits = useSelector(store => store.outfits.faveOutfits);

    useEffect(() => {
        dispatch({
            type: 'FETCH_FAVORITE_OUTFITS'
        })
        return () => {
            dispatch({
              type: 'CLEAR_FAVORITE_OUTFITS'
            })
          }
    }, []);

    return (
        <>
            <p>Favorite Outfit List Page</p>
            <FavoriteOutfitItem />
        </>
    );
};

export default FavoriteOutfitList;