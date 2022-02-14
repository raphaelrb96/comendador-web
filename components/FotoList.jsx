import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { colorPrimary } from "../utilidades/Cores";

const useStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    display: 'inline-block',
    flexDirection: 'row'
    
  },
  title: {
    color: colorPrimary,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  item: {
      width: 100,
      height: 100
  }
};



const FotoList = ({imagens, click}) => {

    const classes = useStyles;

    const itemFoto = foto => (
        <ImageListItem>
            <img style={classes.item} src={foto} />
        </ImageListItem>
    );

    return (
        <span style={classes.root}>
            <ImageList style={classes.imageList} cols={1.3}>
                {imagens.map(itemFoto)}
            </ImageList>
        </span>
    )
}

export default FotoList