import React from "react"
import { Heading } from "react-bulma-components"

export default function Home() {
	return (
		<div class="columns">
            <div class="column">
                <Heading className="has-text-centered">MUM's HUB</Heading>
                <h1>
                    <p className="has-text-justified"> When you have found out that you are pregnant, there are a lot of things you need to know. 
                    Sometimes just knowing where to start and which information you can trust can be a challenge. 
                    On the following pages you will find out information of the various tests and scans you will need, 
                    what is safe for both you and your baby and what are the best lifestyle changes you might need to 
                    make to have a healthy pregnancy and baby. We also have information on how your baby will develop 
                    and grow over the next nine months and also some of the common issues that most women encounter during 
                    their pregnancy.</p>
                    <br></br>
                    <p className="has-text-justified">The typical pregnancy has three trimesters and lasts around 40 weeks from the first day of a woman's 
                    last period. In each trimester, the fetus will meet specific developmental milestones.While 40 weeks is 
                    the usual time frame, a full-term baby can be born as early as 37 weeks and as late as 42 weeks.</p>
                    <br></br>
                    <p className="has-text-justified">First Trimester<br></br>
                    The first trimester lasts for the first 12 weeks of the pregnancy and is crucial for the baby's development.
                    At conception, the egg and sperm combine to form a zygote, which will implant in the uterine wall.The zygote
                    becomes an embryo as the cells divide and grow. All of the major organs and structures begin to form.</p>
                    <br></br>
                    <p className="has-text-justified">Second Trimester<br></br>
                    The second trimester lasts between week 13 and 26 of pregnancy. The fetus will go through a lot of changes 
                    during this time and grow from approximately 4–5 inches long to around 12 inches long.During the second trimester,
                    the fetus will also go from weighing about 3 ounces to weighing 1 pound (lb) or more.</p>
                    <br></br>
                    <p className="has-text-justified">Third Trimester<br></br>
                    The third trimester lasts from week 27 until delivery, which is usually around week 40. During this trimester,
                    a developing baby will grow from around 12 inches long and 1.5 lbs in weight to about 18–20 inches long and 7–8 
                    lbs in weight.Most of the organs and body systems have formed by now, but they will continue to grow and mature 
                    during the third trimester.</p>
                </h1>
            </div>
            <div class="column">
                <img alt="All through Pregnancy !" className="column is-full" src="pregnant.png"/>
            </div>
        </div>
	)
}