import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';


export default function Home(props) {
  return (
    <div className={styles.container}>
        <Head>
          <link rel="shortcut icon" href="favicon.png" type="image/png" />
          <title>Início | Move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />

            </div>
          </section>
        </CountdownProvider>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return {
    props: {level, 
        currentExperience, 
        challengesCompleted}
  }
};
