// src/components/common/Spinner.jsx
import { Loader2 } from 'lucide-react';

const Spinner = () => (
    <div className="flex justify-center items-center h-full">
        <Loader2 size={24} className="animate-spin" />
    </div>
);
export default Spinner;