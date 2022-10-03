import React from 'react';
import Image from './Image';

export default function GatsbyImage({ src, ...rest }) {
  return <Image src={src} {...rest} />;
 
}
