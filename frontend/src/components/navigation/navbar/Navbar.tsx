import Container from "@/components/Container";
import NavbarBreadcrumb from "@/components/navigation/breadcrumb/NavbarBreadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  CalendarClock,
  ChevronDown,
  Key,
  LayoutTemplate,
  LogOut,
  Plus,
  User,
} from "lucide-react";

const Navbar = () => {
  return (
    <nav className="py-4">
      <Container className="px-8">
        <ul className="flex gap-6 items-center">
          <li className="me-auto">
            <NavbarBreadcrumb />
          </li>
          <li>
            <ButtonGroup>
              <Button className="bg-blue-600 hover:bg-blue-600 hover:opacity-85">
                <Plus />
                Add New
              </Button>
              <ButtonGroupSeparator />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-600 hover:opacity-85">
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <CalendarClock />
                    Event
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LayoutTemplate />
                    New Template
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User />
                    New Invitee
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="border border-gray-300 p-3 rounded-full">
                <Bell size={20} strokeWidth={2} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-sm text-gray-500 w-56">
                  Your Notifictions
                </DropdownMenuLabel>
                <DropdownMenuItem>Notification</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>

          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex gap-4 items-center border-1 border-gray-300 p-2 rounded-full cursor-pointer hover:bg-gray-200">
                  <Avatar className="w-10 h-10">
                    <AvatarImage />
                    <AvatarFallback className="bg-blue-300">AM</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-sm">Yassine Billali</p>
                  <ChevronDown size={18} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                  <Key /> Change Password
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </Container>
    </nav>
  );
};
export default Navbar;
