
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Navigation, Clock, Phone } from "lucide-react";

interface OfficeFinderProps {
  onBack: () => void;
}

const OfficeFinder = ({ onBack }: OfficeFinderProps) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedOffice, setSelectedOffice] = useState(null);

  // Sample office data
  const offices = [
    {
      id: 1,
      name: "Immigration Services Center",
      type: "Immigration",
      address: "123 Government Street, Downtown",
      distance: "2.3 km",
      hours: "Mon-Fri 8:00-16:30",
      phone: "+1 (555) 123-4567",
      services: ["Visa Applications", "Residence Permits", "Work Permits"],
      waitTime: "15-30 min",
      rating: 4.2
    },
    {
      id: 2,
      name: "Municipal Services Office",
      type: "Government",
      address: "456 City Hall Avenue",
      distance: "3.1 km",
      hours: "Mon-Thu 9:00-17:00, Fri 9:00-15:00",
      phone: "+1 (555) 234-5678",
      services: ["Tax Registration", "Social Security", "Healthcare Enrollment"],
      waitTime: "10-20 min",
      rating: 4.5
    },
    {
      id: 3,
      name: "Employment Authorization Unit",
      type: "Employment",
      address: "789 Business District",
      distance: "4.7 km",
      hours: "Tue-Fri 8:30-16:00",
      phone: "+1 (555) 345-6789",
      services: ["Work Permits", "Internship Authorization", "Employment Verification"],
      waitTime: "20-45 min",
      rating: 3.8
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Immigration': return 'bg-blue-100 text-blue-700';
      case 'Government': return 'bg-green-100 text-green-700';
      case 'Employment': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Find Offices</h1>
              <p className="text-sm text-slate-600">Locate government offices and services near you</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Navigation className="h-5 w-5 mr-2 text-teal-600" />
              Location Search
            </CardTitle>
            <CardDescription>
              Enter your address or use your current location to find nearby offices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input 
                placeholder="Enter your address or postal code"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-teal-600 hover:bg-teal-700">
                <MapPin className="h-4 w-4 mr-2" />
                Use My Location
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Offices Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {offices.map((office) => (
            <Card key={office.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{office.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getTypeColor(office.type)}>
                        {office.type}
                      </Badge>
                      <span className="text-sm text-slate-600">★ {office.rating}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-teal-600 border-teal-200">
                    {office.distance}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-start space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-slate-500 mt-0.5" />
                    <span className="text-slate-600">{office.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">{office.hours}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">{office.phone}</span>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Services Available:</h4>
                  <div className="flex flex-wrap gap-1">
                    {office.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Wait Time */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-sm">
                    <span className="text-slate-600">Avg. wait time: </span>
                    <span className="font-medium text-slate-800">{office.waitTime}</span>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      Get Directions
                    </Button>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                      Visit Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">📍 Office Visit Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Call ahead to confirm hours and required documents</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Arrive early to avoid longer wait times</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Bring original documents and photocopies</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Consider making an appointment if available</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OfficeFinder;
