import Header from "./Header";
import ImageBox from "./ImageBox";
import PageHeader from "./PageHeader";
import Footers from './Footers';
import TeamPage from './TeamPage'

export default function Story() {
  return (
    <div>
      <Header/>
      <PageHeader headertitle="Our Team" />
      <TeamPage />
    <Footers/>
    </div>
  )
}
