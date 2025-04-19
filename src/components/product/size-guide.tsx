
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const sizeGuideData = {
  measurements: [
    { size: "XS", chest: "86-91", waist: "71-76", hips: "86-91" },
    { size: "S", chest: "91-97", waist: "76-81", hips: "91-97" },
    { size: "M", chest: "97-102", waist: "81-86", hips: "97-102" },
    { size: "L", chest: "102-107", waist: "86-91", hips: "102-107" },
    { size: "XL", chest: "107-112", waist: "91-96", hips: "107-112" },
    { size: "XXL", chest: "112-117", waist: "96-101", hips: "112-117" },
  ],
};

export function SizeGuide() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-cormorant mb-2">How to Measure</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            For the best fit, take your measurements over your underwear. Use a tape
            measure and keep it level with the floor. All measurements are in
            centimeters (cm).
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Size</TableHead>
              <TableHead>Chest (cm)</TableHead>
              <TableHead>Waist (cm)</TableHead>
              <TableHead>Hips (cm)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sizeGuideData.measurements.map((row) => (
              <TableRow key={row.size}>
                <TableCell className="font-medium">{row.size}</TableCell>
                <TableCell>{row.chest}</TableCell>
                <TableCell>{row.waist}</TableCell>
                <TableCell>{row.hips}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="space-y-4 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-black mb-1">Chest</h4>
            <p>Measure around the fullest part of your chest, keeping the tape measure level.</p>
          </div>
          <div>
            <h4 className="font-medium text-black mb-1">Waist</h4>
            <p>Measure around your natural waistline, at the narrowest part of your torso.</p>
          </div>
          <div>
            <h4 className="font-medium text-black mb-1">Hips</h4>
            <p>Measure around the fullest part of your hips, about 20cm below your waist.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
