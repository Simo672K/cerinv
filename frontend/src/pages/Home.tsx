import Container from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { History } from "lucide-react";

function Home() {
  return (
    <Container className="px-8 mt-4">
      <section className="grid grid-cols-4 gap-8">
        <Card className="shadow-none">
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-cyan-200 p-2 rounded">
                <History size={16} strokeWidth={1.5} />
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Scheduled Events
              </p>
            </div>
            <h5 className="text-4xl font-medium">2</h5>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-200 p-2 rounded">
                <History size={16} strokeWidth={1.5} />
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Scheduled Events
              </p>
            </div>
            <h5 className="text-4xl font-medium">2</h5>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-fuchsia-200 p-2 rounded">
                <History size={16} strokeWidth={1.5} />
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Scheduled Events
              </p>
            </div>
            <h5 className="text-4xl font-medium">2</h5>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-green-200 p-2 rounded">
                <History size={16} strokeWidth={1.5} />
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Scheduled Events
              </p>
            </div>
            <h5 className="text-4xl font-medium">2</h5>
          </CardContent>
        </Card>
      </section>
      {/* Navbar goes in here */}
      {/* body goes in here */}
    </Container>
  );
}
export default Home;
