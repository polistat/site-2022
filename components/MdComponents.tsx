import { MathJax } from 'better-react-mathjax';

import CandidateProfileGrid from './CandidateProfileGrid';
import CandidateProfileHeader from './CandidateProfileHeader';
import CandidateProfileBox from './CandidateProfileBox';
import CandidateProfileWideBox from './CandidateProfileWideBox';

import Center from './Center';

export default {
  Math: MathJax,
  Center,
  Grid: CandidateProfileGrid,
  Header: CandidateProfileHeader,
  Box: CandidateProfileBox,
  WideBox: CandidateProfileWideBox,
};