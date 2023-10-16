import React, { useState, useRef } from 'react';
import cl from './two.module.scss';
import SecondScene from '../components/SecondScene';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';

const models = [
	{
		title: '焦糖布丁',
		model: './models/pudding/bake.glb',
		texture: './models/pudding/bake.jpg',
		name: ['布丁'],
		scale: 0.2,
		position: [0.0, 0.0, 0.0],
		rotation: [0, 0, 0.0],
	},
	{
		title: '柴犬烧',
		model: './models/dog/dog.glb',
		texture: './models/dog/dog.jpg',
		name: ['dog', '柱体', '盘子'],
		scale: 0.25,
		position: [0.1, 0, 0],
		rotation: [0, 0, 0],
	},
	{
		title: '小熊吐司',
		model: './models/bread/bread.glb',
		texture: './models/bread/bread.jpg',
		name: ['鸡蛋', '面包', '吐司盘子', '熊'],
		scale: 15,
		position: [0, 0, 0],
		rotation: [0, 0, 0],
	},
	{
		title: '蒙布朗',
		model: './models/montblanc/montblanc.glb',
		texture: './models/montblanc/montblanc.jpg',
		name: ['蒙布朗奶油', '底座', '蒙布朗盘子', '薯条', '栗子'],
		scale: 1,
		position: [0, 0, 0],
		rotation: [0, 0, 0],
	},
	{
		title: '马卡龙',
		model: './models/macaron/macaron.glb',
		texture: './models/macaron/macaron.jpg',
		name: ['马卡龙'],
		scale: 0.35,
		position: [0, 0, 0],
		rotation: [-Math.PI * 0.3, Math.PI * 0.4, Math.PI * 0.3],
	},
];

const Scene = ({ sceneProps }) => {
	const scene = {
		title: sceneProps.title,
		model: useGLTF(sceneProps.model),
		texture: useTexture(sceneProps.texture),
		modelName: sceneProps.name,
		scale: sceneProps.scale,
		position: sceneProps.position,
		rotation: sceneProps.rotation,
	};

	return <SecondScene sceneProps={scene} />;
};

const Two = () => {
	const [sceneProps, setsceneProps] = useState(models[0]);
	const titles = useRef([]);
	const [clickedClass, setClickedClass] = useState([true, false, false, false, false]);

	const handleModelTitleClick = (index) => {
		let classList = new Array(5).fill(false);
		classList[index] = true;
		setClickedClass(classList);

		setsceneProps(models[index]);
	};

	return (
		<div className={cl.page}>
			<div className={cl.left}>
				<ul>
					{models.map((item, index) => (
						<li
							className={cl.modelTitle}
							style={{
								color: clickedClass[index] ? '#eefffd' : '#ffffff',
								textShadow: clickedClass[index] ? '0 0 4px #fff' : '',
							}}
							key={'title' + index}
							ref={(el) => (titles.current[index] = el)}
							onClick={() => handleModelTitleClick(index)}
						>
							{item.title}
						</li>
					))}
				</ul>
			</div>
			<div className={cl.right}>
				<Canvas camera={{ fov: 25, position: [5, 5, 5] }}>
					<OrbitControls enablePan={false} enableZoom={false} />
					<ambientLight intensity={1} />
					<directionalLight position={[0, 0, 1]} />
					<Scene sceneProps={sceneProps} />
				</Canvas>
			</div>
		</div>
	);
};

export default Two;
