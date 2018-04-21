/* eslint-disable max-len */
import React from 'react';

import styles from './WelcomeMessage.sass';

const WelcomeMessage = () => (<div className={styles.wrapper}>
  <div className={styles.container}>
    <h1 className={styles.title}>Welcome to the <font color="#392e5c">Twitch</font>ewer!</h1>
    <p className={styles.paragraph}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porttitor at orci id imperdiet. Suspendisse vestibulum tellus quis ante lobortis, vitae ultrices justo dictum. Vivamus blandit ullamcorper elit, sit amet congue diam euismod ut. Sed ac facilisis sem. In volutpat auctor ex, vel efficitur quam molestie ac. Maecenas sed fermentum odio. Nulla egestas justo neque, id molestie elit dapibus ac. Suspendisse feugiat dapibus mauris euismod efficitur. Sed sit amet quam vitae neque finibus mattis.
    </p>
    <p className={styles.paragraph}>
      Aenean tincidunt sollicitudin sagittis. Vestibulum rhoncus, nulla at ultrices rhoncus, eros sapien ornare odio, eu sollicitudin dolor lectus non tortor. Ut fringilla vulputate odio. Nam nisl purus, dignissim vitae ipsum nec, viverra viverra ex. Pellentesque et arcu porttitor, consectetur eros suscipit, tempus ante. Sed sollicitudin elit non sapien gravida tincidunt. Maecenas eget pharetra urna. Quisque at ex sit amet metus efficitur rhoncus at in nunc. Nulla pharetra cursus felis, ac posuere ipsum volutpat in. Nam dictum leo id est iaculis, eget mattis enim convallis. Pellentesque non erat vitae arcu consectetur finibus eget ut nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis consectetur ex vitae massa placerat porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
    </p>
    <p className={styles.paragraph}>
      Phasellus lacinia auctor nisi. Donec interdum a libero in tincidunt. Etiam et nisl eros. Mauris urna nisi, laoreet et hendrerit nec, semper nec leo. Quisque orci lectus, ultrices non commodo eget, porta in neque. Aenean at mi eget diam pharetra sagittis. Nullam non lobortis purus. In vel augue imperdiet, mollis nibh mattis, tristique mi. Sed placerat porta nisi, a condimentum arcu posuere sit amet. In sed sodales leo. Mauris rhoncus arcu at augue molestie, vitae porta dui dapibus. Maecenas sit amet pellentesque libero, et egestas risus. Suspendisse diam ipsum, vulputate in nisi consequat, porta malesuada dolor.
    </p>
  </div>
</div>);

export default WelcomeMessage;
