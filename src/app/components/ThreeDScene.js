"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// 自定义模型组件
const Model = ({ path }) => {
  // 使用 useGLTF 钩子来加载 glTF 3D 模型文件
  const { scene } = useGLTF(path);
  const modelRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { camera } = useThree();
  // 获取鼠标位置
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 当鼠标位置变化时执行
  useEffect(() => {
    if (modelRef.current) { // 确保模型已经加载完成
      const targetPoint = new THREE.Vector3(mousePosition.x, mousePosition.y, 0.75); // 创建一个 Vector2 对象表示鼠标位置
      if (targetPoint.x > 0.35) targetPoint.setX(0.35);
      if (targetPoint.x < -0.25) targetPoint.setX(-0.24);
      if (targetPoint.y > 0.16) targetPoint.setY(0.16);
      if (targetPoint.y < -0.27) targetPoint.setY(-0.27);
      modelRef.current.lookAt(targetPoint);
    }
  }, [mousePosition, camera]); // 依赖于鼠标位置和相机

  // 返回模型并允许事件处理
  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[4, 4, 4]}
    // onClick={() => alert('3D 模型被点击了!')} // 点击事件
    // onPointerOver={(e) => (e.object.material.color.set('red'))} // 鼠标悬停事件
    // onPointerOut={(e) => (e.object.material.color.set('white'))} // 鼠标离开事件
    />
  );
};

// 主场景组件
const ThreeDScene = ({ path }) => {
  return (
    <Canvas camera={{
      position: [0, 0, 7], // 设置相机的初始位置
    }}>
      {/* 控制摄像头和模型旋转 */}
      <OrbitControls enableZoom={false} enableRotate={false} />
      {/* 环境光 */}
      <ambientLight intensity={0.5} />
      {/* 方向光 */}
      <directionalLight position={[0, 20, 5]} intensity={1} />
      {/* 3D 模型 */}
      <Model path={path} />
    </Canvas>
  );
};

export default ThreeDScene;
