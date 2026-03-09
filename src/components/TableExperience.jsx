import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function TableModel({ scrollYProgress }) {
  const { scene } = useGLTF("/models/table.glb");

  const ref = useRef();

  const targetRotation = useRef(0);
  const targetX = useRef(-0.9);

  useFrame(() => {
    if (!ref.current) return;

    const scroll = scrollYProgress.get();

    targetRotation.current = -scroll * Math.PI * 0.4;

    ref.current.rotation.y +=
      (targetRotation.current - ref.current.rotation.y) * 0.08;

    targetX.current = -0.9 - scroll * 1.2;

    ref.current.position.x += (targetX.current - ref.current.position.x) * 0.08;
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1.3}
      position={[0.3, 0.1, -0.2]}
    />
  );
}

function CameraAnimation({ scrollYProgress }) {
  const { camera } = useThree();

  const targetZ = useRef(6);

  useFrame(() => {
    const scroll = scrollYProgress.get();

    targetZ.current = 6 - scroll * 2;

    camera.position.z += (targetZ.current - camera.position.z) * 0.08;

    camera.lookAt(0, 0, 0);
  });
}

function Hotspot({ x, y, label }) {
  return (
    <div
      className="absolute flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-lg"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%,-50%)",
      }}
    >
      <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center">
        +
      </div>

      <span className="text-sm">{label}</span>
    </div>
  );
}

function InfoCard({ x, y, title, text, onClose }) {
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="absolute w-[240px] bg-white/95 backdrop-blur p-4 rounded-lg shadow-xl"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -150%)",
      }}
    >
      {/* CLOSE BUTTON */}

      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-black text-sm"
      >
        ✕
      </button>

      <h3 className="text-[#0b5c6b] font-semibold text-sm mb-1">{title}</h3>

      <p className="text-xs text-gray-600 leading-relaxed">{text}</p>
    </motion.div>
  );
}

export default function TableExperience() {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [active, setActive] = useState(null);

  return (
    <section ref={ref} className="h-[400vh] w-full bg-[#dceeee] ">
      <div className="sticky top-0 h-screen flex">
        {/* LEFT TEXT */}

        <motion.div
          style={{ x: textX, opacity: textOpacity }}
          className="w-1/2 flex flex-col justify-center pl-24"
        >
          <h2 className="text-[33px] leading-[1.15] tracking-[6px] font-semibold text-[#0b5c6b] uppercase mb-10">
            There are many <br />
            cannabis products
          </h2>

          <p className="text-[#0b5c6b] text-[13px] leading-[1.9] max-w-sm font-semibold">
            Cannabis is a collective term for all products made from the
            cannabis plant. In addition, there are chemically produced
            substances with cannabis-like effects. It is mainly the top shoots
            of the female plant that are used for marijuana, but several parts
            of the plant also contain active ingredients that are used to make
            hashish and various oils. All of these products are regulated as
            narcotics and are currently prohibited from using, making, buying,
            selling or storing.
          </p>

          <p className="mt-10 text-[18px] text-[#0b5c6b] underline underline-offset-4 w-fit cursor-pointer">
            Click on the different products
            <br />
            to read more.
          </p>
        </motion.div>

        {/* 3D CANVAS */}

        <div className="absolute right-0 w-3/4 h-full">
          <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />

            <TableModel scrollYProgress={scrollYProgress} />
            <CameraAnimation scrollYProgress={scrollYProgress} />

            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.5}
              scale={10}
              blur={2}
            />
          </Canvas>
        </div>

        {/* HOTSPOTS */}

        <div className="absolute inset-0 -translate-x-6">
          <div onClick={() => setActive("cbd")}>
            <Hotspot x="50%" y="43%" label="CBD Oil" />
          </div>

          <div onClick={() => setActive("marijuana")}>
            <Hotspot x="60%" y="45%" label="Marijuana" />
          </div>

          <div onClick={() => setActive("hash")}>
            <Hotspot x="51%" y="58%" label="Hash" />
          </div>

          <div onClick={() => setActive("oil")}>
            <Hotspot x="38%" y="43%" label="Cannabis Oil" />
          </div>
        </div>
        {/* INFO DIALOGS */}

        {active === "cbd" && (
          <InfoCard
            x="50%"
            y="43%"
            title="CBD Oil"
            text="CBD oil is extracted from cannabis plants and is used for medical and wellness purposes."
            onClose={() => setActive(null)}
          />
        )}

        {active === "marijuana" && (
          <InfoCard
            x="60%"
            y="45%"
            title="Marijuana"
            text="Marijuana refers to dried flowers of the cannabis plant that are commonly used recreationally."
            onClose={() => setActive(null)}
          />
        )}

        {active === "hash" && (
          <InfoCard
            x="51%"
            y="58%"
            title="Hash"
            text="Hash is a concentrated form of cannabis made from resin collected from the plant."
            onClose={() => setActive(null)}
          />
        )}

        {active === "oil" && (
          <InfoCard
            x="38%"
            y="43%"
            title="Cannabis Oil"
            text="Cannabis oil is a liquid extract used in various products including medical treatments."
            onClose={() => setActive(null)}
          />
        )}
      </div>
    </section>
  );
}
