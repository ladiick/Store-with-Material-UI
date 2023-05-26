import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	IconButton,
	Stack,
	Typography, useMediaQuery
} from "@mui/material";

// const styleBoxCount = {
// 	borderRadius: '50%',
// 	backgroundColor: 'secondary.main',
// 	color: '#fff',
// 	padding: '2px 9px',
// 	display: 'flex'
// }


function BascketItem({item, productMinus, productPlus}) {

	return (
		<Grid item xs={12} md={6} title={item.item.title}>
			<Card sx={{height: '100%',display: "flex",
				flexDirection: "column",}}>
				<CardMedia
					component={'img'}
					sx={{height: 400}}
					image={item.item.image}
					alt={item.title} title={item.title}/>
				<CardContent>
					<Typography variant={'h5'} component={'h3'}>{item.item.title}</Typography>
					<Typography variant={'body1'}>Описание: {item.item.description}</Typography>
					<Stack direction={'row'} justifyContent={'space-between'}>
						<Typography variant={'body1'}>Цена: {item.item.price}</Typography>
					</Stack>
				</CardContent>
				<CardActions disableSpacing sx={{ mt: "auto" }}>
					<Stack justifyContent={'flex-end'}
					       alignItems={'center'}
					       direction={'row'}
					       sx={{width: '100%'}}>
						<IconButton
							sx={{color: 'primary.main'}}
							onClick={() => productPlus(item)}
							variant={'outlined'}>
							<AddIcon/>
						</IconButton>
						<Box sx={{pl: 1, pr: 1}}>
							<Typography
								component={'span'}
								variant={'h6'}>
								{item.count}
							</Typography>
						</Box>
						<IconButton
							sx={{color: 'primary.main'}}
							onClick={() => productMinus(item)}
							variant={'outlined'}>
							<RemoveIcon/>
						</IconButton>
					</Stack>
				</CardActions>
			</Card>
		</Grid>
	);
}

export default React.memo(BascketItem);
