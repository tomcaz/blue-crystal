import Home from '../pages/home.page';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Account from '../pages/account.page';
import DefaultLayout from '../layouts/default.layout';
import Children from '../pages/children.page';
import AddChild from '../pages/add-child.page';
import Organizations from '../pages/orgs.page';
import AddOrganization from '../pages/add-org.page';
import EventHistory from '../pages/event-history.page';
import Event from '../pages/event.page';
import AddEvent from '../pages/add-event.page';


const DefaultRoutes = () => (
    <Routes>
        <Route path="/" element={<DefaultLayout />}>
            <Route path="" element={<Home />} />
            <Route path="account" element={<Account />} />
            <Route path="children" element={<Children />} />
            <Route path="editChild/:id" element={<AddChild />} />
            <Route path="addChild" element={<AddChild />} />
            <Route path="orgs" element={<Organizations />} />
            <Route path="addOrg" element={<AddOrganization />} />
            <Route path="editOrg/:id" element={<AddOrganization />} />
            <Route path="eventHistory" element={<EventHistory />} />
            <Route path="event" element={<Event />} />
            <Route path="addEvent" element={<AddEvent />} />
        </Route>
    </Routes>
)

export default DefaultRoutes