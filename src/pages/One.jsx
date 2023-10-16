import React, { useState } from 'react';
import Navi from '../components/Navi';
import cl from './one.module.scss';
import FirstScene from '../components/FirstScene';

const One = () => {
	const [ballColor, setballColor] = useState('#fa92ff');
	const [post, setpost] = useState(false);

	const colorChangeClick = () => {
		const r = Math.floor(Math.random() * 106 + 150);
		const g = Math.floor(Math.random() * 76 + 180);
		const b = Math.floor(Math.random() * 76 + 180);
		const color = `rgb(${r},${g},${b})`;
		setballColor(color);
	};

	const postChangeClick = () => {
		setpost(!post);
	};

	return (
		<div className={cl.page} id="first">
			<Navi />
			<div className={cl.container}>
				<section className={cl.section1}>
					<h1>回味每一份甜度和快乐</h1>
					<div>
						<img src="./images/line.png" alt="" />
						<span>make it sweeter</span>
					</div>
					<p>当你想要享受美味的甜品时，这里是你的最佳选择，如果你饿了就快来吃掉他们吧 ！</p>
					<p onClick={colorChangeClick} className={cl.btn}>
						做出改变吧
					</p>
				</section>
				<section className={cl.section2} id="section2">
					<h1>CakeCat，甜蜜你的夏天</h1>
					<div>
						<span>每一份都现场制作，美味和热爱永不过期</span>
					</div>
					<p>只选用最上等的材料，将每一道甜品都制作成艺术品般的视觉盛宴，为您的味蕾提供绝对的满足</p>
					<p onClick={postChangeClick} className={cl.btn}>
						冰纷一夏
					</p>
				</section>
			</div>
			<FirstScene color={ballColor} post={post} />
		</div>
	);
};

export default One;
