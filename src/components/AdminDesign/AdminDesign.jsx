import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//  MUI Tools
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';


//  Component Import
import LogOutAdminButton from '../LogOutAdminButton/LogOutAdminButton';
import AdminDesignSlider from '../AdminDesignSlider/AdminDesignSlider';
import OutfitDesignBuilder from '../OutfitDesignBuilder/OutfitDesignBuilder';
import OutfitDesignDetails from '../OutfitDesignDetails/OutfitDesignDetails';
import ItemDesignBuilder from '../ItemDesignBuilder/ItemDesignBuilder';
import ItemDesignDetails from '../ItemDesignDetails/ItemDesignDetails';
import { autocompleteClasses } from '@mui/material';

function AdminDesign() {

  const dispatch = useDispatch();
  const categories = useSelector((store) => store.categories);
  const user = useSelector((store) => store.user);

  const [outfitDesign, setOutfitDesign] = useState(true);
  const [itemDesign, setItemDesign] = useState(false);

  useEffect(() => {
    dispatch ({
      type: 'SAGA_FETCH_CATEGORIES'
    })
    return () => {
      dispatch ({
        type: 'CLEAR_CATEGORY_NAMES'
      })
    }
  }, [user.isAdmin])



  //  TO BE REMOVED LATER
  const testClicker = () => {
    console.log('is admin?', user.isAdmin);
    console.log('categories?', categories);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0.1}>
        <Grid item xs={5}>
          <Box sx={{ height: '95vh', margin: 1, py: 0, backgroundColor: "teal"}}>
            <Stack direction="column" spacing={2} display='flex'>
              <Stack alignSelf='center' direction="row" spacing={2}>
                <Button variant="contained" onClick={(event) => {setOutfitDesign(true)}} color={outfitDesign ? 'primary' : 'baseTan' } >Add/Edit Outfits</Button>
                <Button variant="contained" onClick={(event) => {setOutfitDesign(false)}} color={outfitDesign ? 'baseTan' : 'primary' }>Add/Edit Items</Button>
              </Stack>
              {outfitDesign ? <OutfitDesignBuilder /> : <ItemDesignBuilder />}
              {outfitDesign ? <OutfitDesignDetails /> : <ItemDesignDetails />}
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box sx={{ height: '95vh', margin: 1, py: 0, backgroundColor: 'teal'}}>
          {categories.map(category => (
            <Box sx={{margin: 1, py: 0, px: 4, backgroundColor: "#BFA78A", borderRadius: 2, display: 'flex', flexDirection: 'column' }} key={category.id}>
              <AdminDesignSlider category={category} />
            </Box>
          ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDesign;