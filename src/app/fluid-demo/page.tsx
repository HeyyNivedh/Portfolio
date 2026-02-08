/* eslint-disable react/no-unknown-property */
import FluidGlass from '@/components/FluidGlass';

export default function FluidDemo() {
    return (
        <div className="w-full min-h-screen bg-black flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white text-center mb-8">Fluid Glass Demo</h1>
                <div style={{ height: '800px', position: 'relative' }}>
                    <FluidGlass
                        mode="lens"
                        lensProps={{
                            scale: 0.25,
                            ior: 1.15,
                            thickness: 5,
                            chromaticAberration: 0.1,
                            anisotropy: 0.01
                        }}
                    />
                </div>
                <div className="text-white text-center mt-8 p-4 bg-red-900/50 rounded-lg">
                    <p className="font-bold">Important:</p>
                    <p>If you see errors or empty space, please ensure you have placed the following files in <code>public/assets/3d</code>:</p>
                    <ul className="list-disc list-inside">
                        <li>lens.glb</li>
                        <li>bar.glb</li>
                        <li>cube.glb</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
