import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';

const styleSheet = createStyleSheet({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 8,
    paddingBottom: 8,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

export class MediaCard extends React.Component {

  constructor(props){
    super(props);

  }
  render(){
    const {classes, imageSource, content, title} = this.props;
    return (
      // <div>
      //   <Card className={classes.card}>
      //     <CardMedia>
      //       <img src={imageSource} alt="image" />
      //     </CardMedia>
      //     <CardContent>
      //       <Typography type="headline" component="h2">
      //         {title}
      //       </Typography>
      //       <Typography component="p">
      //         {content}
      //       </Typography>
      //     </CardContent>
      //     <CardActions>
      //       <Button dense color="primary">
      //         Share
      //       </Button>
      //       <Button dense color="primary">
      //         Learn More
      //       </Button>
      //     </CardActions>
      //   </Card>
      // </div>



<Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography type="headline">{title}</Typography>
            <Typography type="subheading" color="secondary">
              {content}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <Typography type="subheading" color="secondary">
              {content}
            </Typography>
          </div>
        </div>
        <div className={classes.cover}>
          <img src={imageSource} alt="image" />
        </div>
      </Card>

    );
  }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(MediaCard);