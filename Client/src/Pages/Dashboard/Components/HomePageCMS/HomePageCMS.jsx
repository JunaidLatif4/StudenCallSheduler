import React, { useState } from 'react'

import Topbar from '../../../Dashboard/Components/TabsBar/TopBar'
import FooterSection from './Components/FooterSection/FooterSection'
import HeroSection from './Components/HeroSection/HeroSection'
import PromotionSection from './Components/PromotionSection/PromotionSection'


let Tabs = ['Hero Section','Promotion Section','Footer Section']



const HomePageCMS = () => {


const [selectedTab, setSelectedTab] =useState('Hero Section')



const currentComponent = (CTAB) => {
    switch (CTAB) {
      case Tabs[0]:
        return <HeroSection />
        break;
      
      case Tabs[1]:
        return <PromotionSection/>
        break;
      case Tabs[2]:
        return <FooterSection/>
        break;
      default:
        return <HeroSection/>
        break;
    }
  }

  return (
<>
<div className='home_page_cms_container'>

<Topbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={Tabs} />
<div className="home_page_cms_box">
{currentComponent(selectedTab)}
</div>
</div>
</>
  )
}

export default HomePageCMS