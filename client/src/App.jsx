import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [model, setModel] = useState(1);
  const [response, setResponse] = useState();

  const handleSubmit = () => {
    if (text.length < 200) {
      window.alert("Please enter text longer than 200 characters");
    }
    fetchResponse();
  };

  const exampleText1 = () => {
    setResponse(undefined);
    var text = "NO ONE CHANGES THE WORLD ALONE. It's a simple truth, but a powerful one. And it's a sentiment that has guided me my entire life. It's what led me to Chicago as a young man, eager to make a difference but unsure how to do it, searching for mentors and a community that I might be able to help out. It's what sustained my campaigns and my time in the White House—the support of millions of people who shared the belief that lasting change can only come from the bottom up. And it's the idea that Michelle and I have devoted our lives to through our Foundation, an organization committed to inspiring, empowering, and connecting people with the voice and the vision for a better tomorrow. Because the world can use more leaders. I saw that clearly during my time in the White House, and I believe that even more today. When global progress is halted, it's not because we lack the solutions to our problems. People don't go hungry because we don't know how to grow food. Children don't die because we lack cures to common diseases. Schools don't fail because we don't know how to provide a quality education. We face these and other challenges, as unique as they are, for a similar reason: because we need the kind of inclusive, ethical leadership that can channel a people's will into progress that benefits everyone. We need fresh eyes and diverse perspectives that can help us question and change our current ways of thinking. That's why the Obama Foundation is supporting emerging leaders throughout the world—because we believe that the community leaders of today will become the global leaders of tomorrow."
    setText(text)
  }

  const exampleText2 = () => {
    setResponse(undefined);
    var text = "it could be pyroluria.. you know.. it is an ongoing tension inside of you.|||Love is when other people think that your man is a garbage, idiot, and dumb, ugly, bad, mean in your eyes he is still your trophy|||well then, how we will show others our existence?|||Hi I just want to ask if other INFJs have the guts to dominate or if no chance be submissive to others. In my case Im always on the submissive side as if I have no chance to control myself or others|||Darnit baby! I want to show myself to others but cant. I want to show my talents. hahahaha. but too shy to do so. And Im so afraid of getting rejected..|||I dont know what to do. I feel incomplete, I dont feel emotionally connected and I always change every time and then. Im tired being surrounded by these people who dominates me and handling my life....|||Why are we so kind individual? I mean why do we always want to help? I think its because we want to be notice. I want to feel that I belong in this world too. Is that so wrong? Grrr.|||I would like to be alone than dealing with people who judge me easily. I enjoy being alone, like this surfing the net, being independent and not relying and bothering other people.|||Hm. In my case I always feel like im inside the shell :((|||Maybe they were just hurt for judging the child personality|||I always daydreaming about me. I am a singer in a concert and the crowds are clapping and enjoying their time listening to my voice. They look like they are really having fun :))) ROFL|||I always feel that I never did anything good. Darn.|||Dont worry guys! Im here for you :)))))|||Darn. Its the same with me. People dont really listen! Hate it!|||Around people? You mean when we are not around of people we can be free? Or we dont let ourselves to get out of this box Im feeling. We cant be who really are because of people judging us.|||Hey everyone! Have you felt that you are inside the box and hiding? I mean Im there and Im around people but why I feel so invisible as if no one really see me.|||Mine is : perlasjean|||I cry when people keeps saying I did not good enough where as I did give my best. And when they blame me on their own mistakes :(|||Hahaha! You are happy? LOL Well I'd love to join a nude party! Wooooohhh!|||Hahaha! You are happy? LOL Well I'd love to join a nude party! Wooooohhh!|||Hahahaha! Maybe I could try living in beaches :)) LOL|||When I do task Im really afraid that I might do something stupid. I felt embarassed when I do it uncorrectly and my body is just shaking. Have you ever felt this way? Or it just happen this past few...|||Hm. Well I think Im a good person enough. And I choose choices between what is right or wrong. Of course I follow the right things.|||Hehehe. I feel the same way. I dont talk to people I know well. I find them boring or even senseless to talk to. I want to be alone and do what keeps me happy. People will just leave, I think they...|||Hm. Yeah. I think I change a lot. I dont know Its just Im being so nice and giving to people whom I really care, yet they dont know how to appreciate me.|||I think you should leave the house. Hehehe. You dont need your family if they dont understand you or even listen to you. There are thousands of people and you are not alone. Just get a life you know....|||You INFPs are always self pitying.|||Yehey! You agree with me! Yes its nudity but not trying to seduce them.|||Yeah I think they should not look.|||What? You think its hot? My parents are telling me to put on clothes. But I really dislike it! Do you think its okay to walk around the house nude?|||Hi everyone! Do you wear clothes? Me, I dont like wearing clothes I feel uncomfortable with clothes that I wear even if they look good on me. I just hate wearing clothes. And I dont wear clothes when...|||Woah ESTPs vulnerable? Really? You guys have a good body which I really admire. Maybe you are strong outside but vulnerable inside|||Are you 594? hehehe. Im 459. Glad to meet you :))|||Have you ever experience that people laugh at us so/sx's? uh. I hate it! Im walking doing my own thing and the people around are smiling and laughing.|||yeah we should all be put to a fucking death I guess|||I find myself talking differently. I mean how I pronounce them.|||Why? Do you hate us that much?|||Im so/sx. how do you guys see us? are we acting different?|||a fucking senseless person.|||I do the same thing. Im an escapist! and I really dont want to be on the spotlight.|||what a face! LOL|||Of course not! you're enneagram type 2. I really have a huge attraction with Enneagram 2 people :D|||you said you're a type 2 right? well i've seen some 2s really afraid of people and as I observe them they really are very very awkward.|||SX/SO SO/SX SX/SP SP/SX SP/SO SO/SP  and what stacking do you love and hate the most?|||Hi fellow ISFPs. Do you find yourself lately difficult to deal with the crowd? :confused:|||I really love you guys when it comes to clothing! :d hahahaha!|||the main purpose why people live is to find God and have faith in him|||We are disappearing and we are not the crowds favorite anymoree :( .|||Hahaha! Well yeah you're right. I live in the Philippines. Our country is just copying the culture style of korea. ISFPs here are becoming more rare.|||Hahaha! Well yeah you're right. I live in the Philippines. Our country is just copying the culture style of korea. ISFPs here are becoming more rare."
    setText(text)
  }

  const exampleText3 = () => {
    setResponse(undefined);
    var text = "Friend: So, you haven't been to the new office yet! Me: No.  I was planning to go to the grand opening but  . . . something happened.   Friend: You really need to work on your social excuses. ...|||Sense of humor is important.  Laughing with my partner is right up there with sexual pleasure among my fondest moments.  And not just her laughing at what I say, but joining in the back and forth.  I...|||So, I'm an INTJ and I just had a dating experience with a confirmed ENFP.  First night we met for a drink.  Very nice.  I liked her easy laugh and energy.  Second date was dinner.  More of the same. ...|||The one INFP I know pretty well is not smiley, although she has a kind of reflexive half-smile.  She has a remarkably non-expressive face now that I think of it.  When I cause her to really smile or...|||In my profile I didn't indicate any preference for a particular species.|||INTJs, at least the mature and healthy ones, are actually very open to being corrected. Here's why: INTJs spend an enormous amount of time and energy constructing an internal conceptual model of the...|||double post|||Having a brief email chat with a new acquaintance on a dating site (my first foray into that scene).  She is middle-age, never married, no children and doesn't want any, advanced degree and career in...|||Here are some things I would do if I had it to do over again (or if I am ever with another INFJ):  1. If possible, never communicate on any sensitive issue other than in person. 2. Never joke...|||I had a long-term romantic relationship with an INFJ.  Overall, I would not call her an asshole at all, not to anyone.  People that she judged to be flawed in some offensive way she simply avoided or...|||I don't much like the term mastermind for INTJs.  I think it implies a desire to control people or for self-aggrandizement and I don't think most INTJs are interested in that at all.  They might be...|||I would be very welcoming to any input from my partner as to what she liked - as long as it didn't become a constant harangue.  But some simple suggestions as to what you like?  Please, yes.  That is...|||Regardless of their personality type, people tend to accumulate emotional scar tissue over time.  A history of traumas, large and small, leave reactive patterns in the nervous system that can be...|||Mindfulness - typical in the sense that it is system optimizing/hacking Woodworking with traditional hand tools and methods - probably not typical Reading about physics, history, and mythology -...|||Emit guttural sound of surprise then deploy cloaking device.  But seriously, although I have had many lovers, I can't remember a single instance when someone said a romantic I love you to me...|||I have only anecdotal evidence.  But I find it compelling.  The descriptions of the INTJ type fit me perfectly.  Other people of other types I have encouraged to take the test have often been...|||Might I ask why you care about sticking the relationship in a pigeon hole with a label on it?  She is obviously skittish about being pinned down to some concept of a relationship but is obviously NOT...|||I would suggest that you not look at every date as a scouting mission for the one.  Lighten up and go have some fun.  The more people you meet, the better your chances of meeting an interesting...|||Stay friends with her, but back off on the time commitment, knock off the touchy stuff and the goo goo eyes, start dating other people for real, don't hide the fact from her that you are dating other...|||I have a broad range of interests and have had careers in science (chemist) and something more like philosophy (lawyer).  Now my primary interest is in mindfulness, which is a kind of subjective...|||To penetrate as deeply as possible into the truth of the way in which self and world manifest.  Stated differently, to explore the essence of existence itself.|||I can speak for myself and say the following:  1. I am oblivious to any subtle signals of attraction.  This has caused me much regret, sometimes years later, when I realized what I missed.  2....|||It seems to indicate an unhealthy attachment to the illusion of permanence.|||Great question, OP.  I am attracted to INFXs but I have not thought about why.  They do tend to arouse a protective instinct in me.  And they don't trigger my argumentative side because they really...|||I have a saying: tact is the companion virtue to honesty.  Tact, and the ability to know when the stark truth is harmful, are bits of wisdom INTJs learn over time (or not)|||Of course.  BECAUSE if they were wrong about something they would change their analysis.  So if they claim to know something, they DO, to the very best of their considerable analytical ability given...|||I think you are too focused on how your INTJ feels and wanting him to share that information with you.  That's probably not going to be the best way to relate to him.  It is likely to be awkward. ...|||I will make one more post to this thread and then move on.  First, let's review.  I pointed out the paradox that people who cannot be trusted to govern themselves cannot be trusted to govern each...|||Undoubtedly YOU will be the arbiter of who these elite rulers will be?  Hehehehe.    Your suggestion doesn't appall me, it just lacks rational rigor and is based on the typical kind of elitism...|||Advocates of all-powerful governments always seem to assume that it will be their superior morality and plan for the future that the proposed government will impose.  I suggest that is an assumption...|||Who told you INTJs don't have emotion?  I experience a wide range of emotion with great depth.  I just don't make decisions based on emotion.  And my analysis here is perfectly rational.  Although...|||If people are not moral enough to govern themselves, how can they govern each other?|||We may be in agreement that people need to change.  And I do my best to facilitate that change.  Where we probably disagree is that I do not think I have the right to use force to make people...|||I didn't respond to your scenarios and you didn't respond to the paradox I presented.  That is because you have accepted the idea of government by violence as necessary and I reject it as immoral and...|||If people are not fit to govern themselves, they are not fit to govern each other.  There are no top-down solutions to our problems.  If there is to be real change, it must come from the bottom up...|||Not true.  Employees in a business participate in that social structure BY CONSENT.  If they don't like it, they can leave.  Presumably your world government will enforce its rule by threat of...|||Government as it now exists everywhere on the planet is based on the threat of violence.  Obey or whatever force is necessary will be used to MAKE you obey.  Thus, the essence of government is...|||You are facing a paradox.  Your underlying assumption (which may be correct) is that people are either, on the one hand, too ignorant and incompetent, or on the other hand, too avaricious and...|||An objective look at history shows governments to be, without any doubt or even close competitor, the most violent, brutal, ruthless, and relentlessly self-serving and murderous entities that have...|||I think you will have to define feminist.  And that might not be so easy.|||I enjoy knocking down unstable conceptual structures.  It's a public service.  This service is not always appreciated.  I really enjoy trying to do it with the least possible words, like a diamond...|||I didn't deviate, but I wasn't clear.  My point, made obliquely I admit, was that your theory for proving Hillary is an INTJ is that it is less likely that she lied about her typing than about her...|||I think I will pass on the grounds that we are off topic.  But I will be happy to follow this up in a new thread if you want to start one!|||So she lied about why she changed parties.  Okay.  Hard to sort the lies sometimes.|||I have a good sense of direction and mapping.  But if I am a passenger in a vehicle, I will not be able to retrace the path we travel.  I have to be focusing on it to store it.|||Yes, I have said twice that Hillary might still be an INTJ if her letter regarding party change was a lie.  But if everything she says and does can be regarded as a fabrication then there is no way...|||Sorry, but you are going to have to define your terms.  What do you mean by passionate?  As I understand the concept, I am not passionate about anything.  There are many subjects in which I am...|||I strongly disagree.  While I think human beings, in general, are often driven by unconscious emotions, INTJs actually DO make decisions based on what they THINK about a problem and the possible...|||Did you read what I wrote?  I can confidently conclude that Hillary is not an INTJ because her reasons for changing party, by her own statement, were emotional.  End of analysis.  Unless, as I...|||This is natural.  For most of us the only time in our whole lives that we are perfectly still is when we are going to sleep.  So our bodies are conditioned to start going to sleep when we sit still. ..."
    setText(text)
  }

  const fetchResponse = async () => {
    fetch("http://127.0.0.1:5000/prediction/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "Text Input": text,
        "Model Choice": model,
      }),
    })
      .then((response) => response.json())
      .then((data) => setResponse(data))
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    if (response != undefined) {
      setResponse(undefined);
    }
    setText(e.target.value);
  }

  const handleModel = (e) => {
    if (response != undefined) {
      setResponse(undefined);
    }
    setModel(e.target.value)
  }

  return (
    <div className="App">
      <h1>MBTI Personality Prediction</h1>
      <h2>Predict your MBTI via Machine Learning Models!</h2>
      <div className="prediction_container">
        <div className="text_container">
          <label>Input Text:</label>
          <textarea
            type="text"
            cols="50"
            rows="20"
            value={text}
            onChange={(e) => handleChange(e)}
          >
            {text}
          </textarea>
        </div>
        <div className="button_container">
          <label>Want some Example Text?</label>
          <button onClick={() => exampleText1()}>Example Text 1</button>
          <button onClick={() => exampleText2()}>Example Text 2</button>
          <button onClick={() => exampleText3()}>Example Text 3</button>
        </div>
        <div className="model_container">
          <label>Model Choice</label>
          <select onChange={(e) => handleModel(e)}>
            <option>Support Vector Classifier</option>
            <option>Random Forest</option>
          </select>
        </div>
        <div className="submitbutton_container">
          <button onClick={() => handleSubmit()}>Submit</button>
        </div>
        {response != undefined ? (
          <div className="response_container">
            <p>Response:</p>
            <p>Model: {model}</p>
            <p>{response.result}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
