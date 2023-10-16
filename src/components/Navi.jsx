import React, { useState } from 'react';
import cl from './Navi.module.scss';

const Navi = () => {
	const [inputActived, setinputActived] = useState(false);
	return (
		<div className={cl.naviWrap}>
			<div className={cl.left}>
				<ul>
					<img src="./images/logo.png" alt="" />
					<li>糖果</li>
					<li>布丁</li>
					<li>蒙布朗</li>
				</ul>
			</div>
			<div className={cl.right}>
				<input className={`${inputActived ? cl.actived : ''}`} type="text" />
				<img src="./images/search.png" alt="" onClick={() => setinputActived(!inputActived)} />
				<div className={cl.cube}>
					<span className={`${cl.side} ${cl.top}`}>Please !</span>
					<span className={`${cl.side} ${cl.front}`}>Eat Me</span>
				</div>
			</div>
		</div>
	);
};

export default Navi;
