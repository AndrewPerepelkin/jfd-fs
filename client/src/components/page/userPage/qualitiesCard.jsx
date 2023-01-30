import React from 'react';
import CardWrapper from '../../common/Card';
import SmallTitle from '../../common/typografy/smallTitle';
import CardText from '../../common/typografy/cardText';
import Qualities from '../../ui/qualities';
import PropTypes from 'prop-types';

const QualitiesCard = ({qualities}) => {
  return (
    <CardWrapper extraСardBodyStyle='d-flex flex-column justify-content-center text-center'>
      <SmallTitle>Qualities</SmallTitle>
      <CardText>{<Qualities qualities={qualities} />}</CardText>
    </CardWrapper>
  );
};

QualitiesCard.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesCard;
