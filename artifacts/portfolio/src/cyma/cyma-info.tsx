'use client';

import {Info, LockKeyhole} from 'lucide-react';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from '@/components/ui/dialog';

export function PrivacyDialog() {
  return <Dialog>
    <DialogTrigger asChild>
      <button className="privacy-button"><LockKeyhole size={13}/>Audio stays on your device<Info size={12} aria-hidden="true"/></button>
    </DialogTrigger>
    <DialogContent className="modal info-modal privacy-modal">
      <DialogTitle>Your sound stays yours</DialogTitle>
      <DialogDescription>Privacy & local processing</DialogDescription>
      <div className="method-copy">
        <div className="privacy-highlight"><LockKeyhole size={20} aria-hidden="true"/><p>Audio analysis, the water simulation, and video rendering happen entirely on your device, in your browser.</p></div>
        <h3>What happens to your audio</h3>
        <p>When you choose a file, CYMA reads it locally. Your audio, filename, frequency analysis, and rendered frames are not uploaded to a server or sent to an external processing service. Your original file remains unchanged.</p>
        <h3>What is saved</h3>
        <p>CYMA keeps your working audio, analysis, and finished video in browser memory for the current session. It does not save this content to a cloud account, an application database, or persistent browser storage. Reloading or closing the page ends that session; there is no saved project to retrieve.</p>
        <h3>You choose what leaves the canvas</h3>
        <p>A finished MP4 stays in the session until you choose to save it. Save MP4 creates a download on your device, subject to your browser’s download settings. Your original audio and any downloads remain under your control, including where you store or share them.</p>
        <h3>No content tracking</h3>
        <p>The studio includes no analytics or advertising trackers and does not collect your creative content for profiling, advertising, or model training. Selecting an audio file does not grant microphone access.</p>
        <div className="info-note"><h3>About the website itself</h3><p>Loading the page requests its code and visual assets from the hosting service. The service may process ordinary access or sign-in information under its own privacy terms, and your browser may cache page assets. These website requests do not contain the audio or visuals you create in CYMA.</p></div>
      </div>
      <DialogClose asChild><button className="info-close">Back to the canvas</button></DialogClose>
    </DialogContent>
  </Dialog>;
}

export function PhysicsDialog() {
  return <Dialog>
    <DialogTrigger asChild><button className="quiet-button"><Info size={15}/>About the physics</button></DialogTrigger>
    <DialogContent className="modal info-modal physics-modal">
      <DialogTitle>The physics beneath the form</DialogTitle>
      <DialogDescription>How sound becomes waves, and waves become a pattern.</DialogDescription>
      <div className="method-copy">
        <p>A vibrating water surface can hold a pattern where reflected waves reinforce and cancel one another. CYMA explores that interplay in a virtual circular vessel: sound excites its wave modes, and moving tracers reveal the resulting structure.</p>

        <h3>A circular vessel, described in polar coordinates</h3>
        <p>Each point is located by its distance <em>r</em> from the center and angle <em>θ</em>. The vessel’s radius <em>R</em> and water depth <em>h</em> set the space in which waves can form. Circular standing-wave shapes are built from Bessel functions:</p>
        <div className="equation" aria-label="Circular wave modes">
          <div>φ<sub>mn</sub>(r, θ) = J<sub>m</sub>(α<sub>mn</sub> r/R) cos(mθ)</div>
          <div>J′<sub>m</sub>(α<sub>mn</sub>) = 0</div>
          <div>k<sub>mn</sub> = α<sub>mn</sub>/R</div>
        </div>
        <p><em>J<sub>m</sub></em> sets the radial rings, <em>m</em> describes angular symmetry, and <em>n</em> selects the radial mode. The derivative condition represents a rigid wall with no flow through it. The wavenumber <em>k</em> measures how tightly the waves fit into the vessel.</p>
        <p>The model contains 1,360 modes. Six equal, softly distributed pressure drives sit around a ring at 62% of the vessel radius. Their arrangement favors sixfold symmetry; changing the sound changes which radial and angular modes respond most strongly.</p>

        <h3>Gravity, surface tension, and resonance</h3>
        <p>Gravity restores larger surface disturbances, while surface tension becomes increasingly influential at short wavelengths. Their combined, finite-depth dispersion relation gives each mode its natural angular frequency:</p>
        <div className="equation" aria-label="Capillary–gravity dispersion relation">
          <div>ω<sub>mn</sub>² = (gk<sub>mn</sub> + σk<sub>mn</sub>³/ρ) tanh(k<sub>mn</sub>h)</div>
          <div>f<sub>mn</sub> = ω<sub>mn</sub>/(2π)</div>
        </div>
        <p>Here <em>g</em> is gravitational acceleration, <em>σ</em> is surface tension, and <em>ρ</em> is water density. CYMA uses water properties near 20 °C: ρ = 998.2 kg/m³, σ = 0.0728 N/m, and kinematic viscosity ν = 1.004 × 10⁻⁶ m²/s.</p>
        <p>Sound drives each mode like a damped oscillator. For a tone at angular frequency <em>ω = 2πf</em>, the complex response is:</p>
        <div className="equation" aria-label="Driven modal response">
          <div>H<sub>mn</sub>(ω) = C<sub>mn</sub> / (ω<sub>mn</sub>² − ω² + 2iβ<sub>mn</sub>ω)</div>
          <div>β<sub>mn</sub> = d (2νk<sub>mn</sub>² + β<sub>wall</sub>)</div>
        </div>
        <p><em>C<sub>mn</sub></em> describes how the pressure drives couple to that mode. The complex number carries both response strength and phase. <em>d</em> is the Damping control, and the assumed wall-loss term <em>β<sub>wall</sub></em> is 1 s⁻¹. A tone near a natural frequency excites that mode strongly; damping broadens and softens the resonance.</p>
        <p>This is why vessel size and depth matter: changing either shifts the resonances, so the same sound can reveal a different arrangement of rings and petals.</p>

        <h3>From an audio spectrum to a changing surface</h3>
        <p>Your audio is decoded locally to a 24 kHz mono signal. A short-time Fourier transform uses an 8,192-sample Hann window, advanced by 512 samples—about 21 milliseconds—to follow up to 32 spectral peaks between 20 and 1,800 Hz. Each peak contributes its amplitude and frequency to the modal response.</p>
        <p>Clean audio mapping subtracts an estimate of the local spectral noise floor while retaining a portion of quiet detail. Smooth automatic gain and Input sensitivity lift softer passages. This processing changes the visual drive; the source audio stays unchanged.</p>
        <p>The display combines the strongest modes into a slowly changing complex field, <em>η</em>. Modal amplitudes retain their previous values and approach the new target exponentially:</p>
        <div className="equation" aria-label="Field and modal memory">
          <div>η(r, θ, t) = ∑ a<sub>mn</sub>(t) φ<sub>mn</sub>(r, θ)</div>
          <div>a(t + Δt) = a<sub>target</sub> + [a(t) − a<sub>target</sub>] e<sup>−Δt/τ</sup></div>
        </div>
        <p>The response time <em>τ</em> follows inverse damping, bounded between 0.08 and 0.6 seconds for the visible envelope. Up to 32 modes contribute to the display, with smooth transitions as their strengths change. The envelope makes the structure visible at screen refresh rates while preserving continuity between moments of sound.</p>

        <h3>Particles gathering into form</h3>
        <p>Every tracer carries a position and velocity from one step to the next. A potential derived from the displayed field guides it toward low-intensity regions; drag slows its movement, and a little diffusion keeps the distribution gently active:</p>
        <div className="equation" aria-label="Tracer motion">
          <div>U = 1 − exp(−8|η|²)</div>
          <div>F = −μ∇U</div>
          <div>v<sub>next</sub> = (v + FΔt) e<sup>−γΔt</sup></div>
          <div>x<sub>next</sub> = x + v<sub>next</sub>Δt + ε√Δt</div>
        </div>
        <p>In normalized vessel coordinates, μ = 0.024 sets attraction strength and γ = 3.4 s⁻¹ sets drag. The force is bounded for stability; <em>ε</em> is a small, centered random displacement. Motion advances in 1/60-second steps, with damped reflections at the circular boundary.</p>
        <p>These illustrative tracers make the field’s nodal structure easy to follow as it gathers, dissolves, and reforms. The particle count controls how densely the field is sampled. Gold light emphasizes its contours and slopes; Pattern brightness changes that illumination.</p>

        <h3>The sound presets</h3>
        <p><strong>432 Hz and 528 Hz</strong> provide steady sine drives for exploring the vessel’s resonances. <strong>Schumann resonance</strong> applies a slow 7.83 Hz drive to the virtual surface. <strong>Tibetan bowl & gong</strong> combines six inharmonic tones with different decay times. A soft strike arrives every 12 seconds and joins the ringing tails already in motion.</p>

        <h3>The model’s physical foundation</h3>
        <p>The wave frequencies and resonant response follow linear capillary–gravity theory for a circular vessel. Tracer transport, envelope smoothing, and visual amplification form a reduced, expressive model. Its domain is small surface waves; nonlinear breaking, splashing, and detailed contact-line motion lie beyond that domain. Reproducing measurements from a particular vessel would require calibration of its drive, boundaries, and losses.</p>
        <p className="further-reading"><a href="https://www.cambridge.org/core/journals/journal-of-fluid-mechanics/article/experimental-studies-of-surface-waves-inside-a-cylindrical-container/BADEE62FA45906F661B88DCD648422ED" target="_blank" rel="noreferrer">Explore experiments with cylindrical surface waves ↗</a></p>
      </div>
      <DialogClose asChild><button className="info-close">Back to the canvas</button></DialogClose>
    </DialogContent>
  </Dialog>;
}
