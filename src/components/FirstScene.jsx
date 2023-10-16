import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { MeshDistortMaterial, OrbitControls, Sphere, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import firstSceneCl from './firstScene.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { EffectComposer, ChromaticAberration, Grid } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

gsap.registerPlugin(ScrollTrigger);

const FirstScene = (props) => {
	return (
		<div className={firstSceneCl.wrap}>
			<Canvas camera={{ fov: 25, position: [5, 5, 5] }}>
				{props.post ? (
					<EffectComposer>
						<ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0015, 0.001]} />
						<Grid
							blendFunction={BlendFunction.OVERLAY}
							scale={1.5}
							lineWidth={0.0}
							size={{ width: '100px', height: '100px' }}
						/>
					</EffectComposer>
				) : (
					''
				)}
				<ambientLight intensity={1} />
				<directionalLight position={[0, 0, 1]} />
				<Scene color={props.color} />
			</Canvas>
		</div>
	);
};

const Scene = (props) => {
	const sun = useRef();
	const cloudGroup = useRef();
	const cloudModel = useGLTF('./models/cloud.glb');

	const juice = useRef();
	const juiceModelBaked = useGLTF('./models/juice/juiceBaked.glb');
	const juiceModelColored = useGLTF('./models/juice/juiceColored.glb');
	const juiceBakedTexture = useTexture('./models/juice/juice.jpg');
	juiceBakedTexture.flipY = false;

	useEffect(() => {
		const tl = gsap.timeline();
		tl.to(juice.current.rotation, {
			scrollTrigger: {
				trigger: '#first',
				scrub: 1,
				start: 'top top',
				end: 'bottom bottom',
			},
			x: -0.75,
			z: 0.52,
			y: 1.1 + Math.PI * 2,
			immediateRender: false,
		})
			.to(juice.current.position, {
				scrollTrigger: {
					trigger: '#first',
					scrub: 1,
					start: 'top top',
					end: 'bottom bottom',
				},
				x: -0.5,
				y: -1.1,
				immediateRender: false,
			})
			.to(juice.current.scale, {
				scrollTrigger: {
					trigger: '#first',
					scrub: 1,
					start: 'top top',
					end: 'bottom bottom',
				},
				x: 5,
				y: 5,
				z: 5,
				immediateRender: false,
			})
			.to(cloudGroup.current.position, {
				scrollTrigger: {
					trigger: '#first',
					scrub: 1,
					start: '60% bottom',
					end: '80% bottom',
				},
				x: -2.2,
				y: -2,
				immediateRender: false,
			})
			.to(sun.current.position, {
				scrollTrigger: {
					trigger: '#first',
					scrub: 1,
					start: '80% bottom',
					end: 'bottom bottom',
				},
				y: 3.0,
				z: 2.9,
				immediateRender: false,
			});
	}, []);

	return (
		<>
			<Sphere args={[1, 100, 100]} scale={0.5} position={[0.9, 1.3, 0]}>
				<MeshDistortMaterial color={new THREE.Color(props.color)} attach="material" distort={0.5} speed={2.5} />
			</Sphere>
			{/* 果汁 */}
			<group ref={juice} scale={6.5} rotation={[-0.3, 0.9, 0.6]} position={[1.55, 2.0, 0.8]}>
				<mesh geometry={juiceModelBaked.nodes.juice.geometry}>
					<meshBasicMaterial map={juiceBakedTexture} />
				</mesh>
				{/* 樱桃枝 */}
				<mesh
					geometry={juiceModelColored.nodes.球体_3.geometry}
					material={juiceModelColored.materials['材质.004']}
				/>
			</group>
			{/* 太阳和云 */}
			<group ref={cloudGroup} scale={0.065} rotation={[-0.1, -0.8, 0.9]} position={[-3.2, -2.6, 0]}>
				<mesh
					ref={sun}
					geometry={cloudModel.nodes.太阳.geometry}
					material={cloudModel.materials['材质.001']}
					position={[5.766, 0.677, 0.342]}
					scale={1.5}
				/>
				<mesh
					geometry={cloudModel.nodes.云.geometry}
					material={cloudModel.materials.材质}
					position={[6.416, 0.129, 4.364]}
					scale={0.831}
				/>
			</group>
		</>
	);
};

export default FirstScene;
