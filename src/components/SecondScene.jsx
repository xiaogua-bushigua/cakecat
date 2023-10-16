import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const SecondScene = ({ sceneProps }) => {
	const modelRef = useRef();

	const model = sceneProps.model;
	const texture = sceneProps.texture;
	const modelName = sceneProps.modelName;

	texture.flipY = false;

	const scale = sceneProps.scale;
	const position = sceneProps.position;
	const rotation = sceneProps.rotation;

	// 对单个mesh进行微调
	const getRotation = (name) => {
		switch (name) {
			case '柱体':
				return [0, 0.0, -1.57];
				break;
			case '果冻梗001':
				return [0, -0.03, 3.14];
				break;
			case '熊':
				return [-1.57, 0, -0.07];
				break;
			default:
				break;
		}
	};
	const getScale = (name) => {
		switch (name) {
			case 'dog':
				return [1, 0.85, 1];
				break;
			case '盘子':
				return [1, 1, 0.8];
				break;
			case '面包':
				return [0.85, 0.85, 0.85];
				break;
			case '吐司盘子':
				return [0.85, 0.85, 0.85];
				break;
			default:
				break;
		}
	};
	const getPosition = (name) => {
		switch (name) {
			case '盘子':
				return [-0.4, -1.1, -0.2];
				break;
			case 'dog':
				return [-0.9, 0, 0];
				break;
			case '柱体':
				return [0.5, -0.21, 0.1];
				break;
			case '鸡蛋':
				return [0, 0.01, 0];
				break;
			case '熊':
				return [-0.001, 0.008, -0.041];
				break;
			case '面包':
				return [0, -0.004, -0.008];
				break;
			case '吐司盘子':
				return [0, -0.007, -0.007];
				break;
			case '蒙布朗盘子':
				return [0, -0.6, 0];
				break;
			case '底座':
				return [0, -0.52, 0];
				break;
			case '薯条':
				return [0, 0, 0];
				break;
			case '栗子':
				return [0, 0.45, 0];
				break;
			case '蒙布朗奶油':
				return [0, -0.2, 0];
				break;
			default:
				break;
		}
	};

	useFrame((state, delta) => {
		modelRef.current.rotation.y += delta * 0.25;
	});

	return (
		<group ref={modelRef} scale={scale} position={position} rotation={rotation}>
			{modelName.map((item, index) => (
				<mesh
					key={sceneProps.title + index}
					geometry={model.nodes[modelName[index]].geometry.center()}
					rotation={getRotation(modelName[index])}
					scale={getScale(modelName[index])}
					position={getPosition(modelName[index])}
				>
					<meshBasicMaterial map={texture} />
				</mesh>
			))}
		</group>
	);
};

export default SecondScene;
