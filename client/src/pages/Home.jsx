// import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import State from '../store';

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from '../config/motion';
import { CustomButtom } from '../components';

const Home = () => {
  const snap = useSnapshot(State);
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className='home' {...slideAnimation('left')}>
          <motion.header {...slideAnimation('down')}>
            <img
              src='./threejs.png'
              alt='logo'
              className='w-8 h-8 object-contain'
            />
          </motion.header>
          <motion.div {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className='head-text'>
                LET`S <br className='xl:block hidden' /> DO IT.
              </h1>
            </motion.div>
            <motion.div {...headContentAnimation}>
              <p className='max-w-md font-normal text-gray-600 text-base'>
                Create your own unique & exclusive shirt with our brand-new 3D
                Customization Tool....
                <br />
                <strong>Unleash your inner imagination to reality</strong> and
                define your own style..
              </p>
              <CustomButtom
                type='filled'
                title='Customize it'
                handleClick={() => (State.intro = false)}
                customStyles='w-fit px-4 py-2.5 font-bold text-sm'
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
