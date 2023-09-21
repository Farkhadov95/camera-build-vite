import React from 'react';

type Props = {
  description: string;
};

const DescriptionTab = ({ description }: Props) => (
  <div className="tabs__element is-active">
    <div className="product__tabs-text">
      <p>{description}</p>
    </div>
  </div>
);

export default DescriptionTab;
