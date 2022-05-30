import React from 'react';
// import logo_png from '../assets/logo_v2.png'
import logo_text from '../assets/logo_text_v2.png'

function About(props) {
  return (
    <div className='about-page'>
      <center>
        <h2>
          About<br />
          <img src={logo_text} style={{height:'2em'}} alt='text logo' />
        </h2>
      </center>

          <div  className='logo-float' style={{backgroundImage:'url(https://cdn.shopify.com/s/files/1/0617/5073/9192/files/website_header_2_1500x.png)'}}>
          </div>

          <p>The idea for Green Thumb came about when I asked my partner for something that could be made better by having a digital way to keep track of, and right away she said, "something to help me keep track of my plants. Like a schedule for plants."</p>

          <p>My partner and I both really like plants. (Okay, yes: it would be more accurate to say that she likes to take care of plants, while I like that there are plants). We both like to live in a place that feels natural and alive, with green leaves and colorful flowers that remind us of the world outside. And so, we have a lot of plants -- and a lot of varieties of plants, all with different needs -- spread throughout our apartment.</p>

          <p>Unfortunately, our apartment <i>doesn't</i> really like plants. It's a small Boston apartment in which the only south-facing window is blocked by the fridge, and all of the windows along both sides are largely obstructed by the neighboring properties. Each room has its drawbacks, and my partner is constantly rearranging things throughout the year to maximize growing conditions.</p>

          <p>But that also means it's easy to lose track of which plant is where, which plants need water this week, and how best to keep everyone happy and healthy. And so Green Thumb was born. </p> 

        <h4>How to use Green Thumb:</h4>
        <p>Green Thumb provides one convenient place to keep track of your all of your houseplants' needs: where they are in your home, when to water them, when to fertilize and repot. It creates a schedule for you based on your specific plants, and allows you to quickly and easily see which of your green, leafy friends needs a drink, day by day.</p>
        
        <p>Here's what you do: Specify each location in your home, and set your preferred "plant care days" in your user preferences. Then, simply add new plants to your personal collection! You'll see your plants organized by location, as well as a customized calendar baseed on the watering needs of each plant. Don't see you newly acquired friend on the list? Add it to the database! The list and care instructions are generated by the community, so the more you add, the more others will benefit! </p>

          <p>Future developments may include: 
            <ul>
              <li>Separate events for different needs, (watering, fertilizing, moving locations, etc.)</li>
              <li>Push notifications on watering days</li>
              <li>Moveable events on calendar, in case you miss a day</li>
              <li>Helpful suggestions for newly added plants as to which location in your home best suits their needs</li>
              <li>As the database of plants grows in size, a search function to streamline entering new houseplant entries</li>
              ...and more!
            </ul>
          </p>
          
    </div>
  );
}

export default About;